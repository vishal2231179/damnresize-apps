const MAX_BODY_BYTES = 25_000;
const ALLOWED_SUBJECTS = new Set([
    'Tool help',
    'Website feedback',
    'Privacy question',
    'Business enquiry',
    'Other'
]);

function jsonResponse(body, status, origin) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': origin,
            'Vary': 'Origin'
        }
    });
}

async function readLimitedBody(request) {
    const reader = request.body?.getReader();
    if (!reader) {
        throw new TypeError('Request body is missing.');
    }

    const chunks = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > MAX_BODY_BYTES) {
                await reader.cancel();
                throw new RangeError('Request body is too large.');
            }
            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }

    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return new TextDecoder().decode(bytes);
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname !== '/api/contact') {
            return new Response('Not found', { status: 404 });
        }
        if (request.method !== 'POST') {
            return new Response('Method not allowed', {
                status: 405,
                headers: { Allow: 'POST' }
            });
        }
        if (!env.ALLOWED_ORIGIN || request.headers.get('Origin') !== env.ALLOWED_ORIGIN) {
            return jsonResponse({ error: 'Request origin is not allowed.' }, 403, env.ALLOWED_ORIGIN || 'null');
        }
        if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
            return jsonResponse({ error: 'Expected a JSON request.' }, 415, env.ALLOWED_ORIGIN);
        }
        if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES) {
            return jsonResponse({ error: 'Message is too long.' }, 413, env.ALLOWED_ORIGIN);
        }

        let data;
        try {
            data = JSON.parse(await readLimitedBody(request));
        } catch (error) {
            if (error instanceof RangeError) {
                return jsonResponse({ error: 'Message is too long.' }, 413, env.ALLOWED_ORIGIN);
            }
            if (error instanceof SyntaxError) {
                return jsonResponse({ error: 'Invalid form submission.' }, 400, env.ALLOWED_ORIGIN);
            }
            console.error('Could not read contact form request:', error);
            return jsonResponse({ error: 'Could not read your message. Please try again.' }, 400, env.ALLOWED_ORIGIN);
        }

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return jsonResponse({ error: 'Invalid form submission.' }, 400, env.ALLOWED_ORIGIN);
        }
        if (typeof data.website === 'string' && data.website.trim()) {
            return jsonResponse({ ok: true }, 200, env.ALLOWED_ORIGIN);
        }

        const name = typeof data.name === 'string' ? data.name.trim() : '';
        const email = typeof data.email === 'string' ? data.email.trim() : '';
        const subject = typeof data.subject === 'string' ? data.subject : '';
        const message = typeof data.message === 'string' ? data.message.trim() : '';
        if (
            !name || name.length > 100 || /[\r\n]/.test(name) ||
            !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            !ALLOWED_SUBJECTS.has(subject) ||
            !message || message.length > 5000
        ) {
            return jsonResponse({ error: 'Please check the form fields and try again.' }, 400, env.ALLOWED_ORIGIN);
        }

        if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL || !env.TURNSTILE_SECRET_KEY) {
            console.error('Contact service is missing required environment configuration.');
            return jsonResponse({ error: 'The contact service is not configured yet.' }, 503, env.ALLOWED_ORIGIN);
        }

        if (typeof data.turnstileToken !== 'string' || !data.turnstileToken || data.turnstileToken.length > 2048) {
            return jsonResponse({ error: 'Please complete the verification and try again.' }, 400, env.ALLOWED_ORIGIN);
        }

        let verificationResponse;
        try {
            const verificationBody = new URLSearchParams({
                secret: env.TURNSTILE_SECRET_KEY,
                response: data.turnstileToken
            });
            const clientIp = request.headers.get('CF-Connecting-IP');
            if (clientIp) verificationBody.set('remoteip', clientIp);
            verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: verificationBody
            });
        } catch (error) {
            console.error('Turnstile verification request failed:', error);
            return jsonResponse({ error: 'Verification is temporarily unavailable. Please try again later.' }, 502, env.ALLOWED_ORIGIN);
        }

        if (!verificationResponse.ok) {
            console.error('Turnstile verification returned status:', verificationResponse.status);
            return jsonResponse({ error: 'Verification is temporarily unavailable. Please try again later.' }, 502, env.ALLOWED_ORIGIN);
        }

        let verification;
        try {
            verification = await verificationResponse.json();
        } catch (error) {
            console.error('Turnstile returned an invalid verification response:', error);
            return jsonResponse({ error: 'Verification is temporarily unavailable. Please try again later.' }, 502, env.ALLOWED_ORIGIN);
        }
        if (!verification.success || verification.hostname !== new URL(env.ALLOWED_ORIGIN).hostname) {
            return jsonResponse({ error: 'Verification failed. Please try again.' }, 400, env.ALLOWED_ORIGIN);
        }

        let providerResponse;
        try {
            providerResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: env.CONTACT_FROM_EMAIL,
                    to: [env.CONTACT_TO_EMAIL],
                    reply_to: email,
                    subject: `DamnResize contact: ${subject}`,
                    text: `Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`
                })
            });
        } catch (error) {
            console.error('Contact email provider request failed:', error);
            return jsonResponse({ error: 'Email delivery is temporarily unavailable. Please try again later.' }, 502, env.ALLOWED_ORIGIN);
        }

        if (!providerResponse.ok) {
            console.error('Contact email provider returned status:', providerResponse.status);
            return jsonResponse({ error: 'Email delivery failed. Please try again later.' }, 502, env.ALLOWED_ORIGIN);
        }

        return jsonResponse({ ok: true }, 200, env.ALLOWED_ORIGIN);
    }
};
