import { EmailMessage } from 'cloudflare:email';

const MAX_BODY_BYTES = 25_000;
const ALLOWED_SUBJECTS = new Set([
    'Tool help',
    'Website feedback',
    'Privacy question',
    'Business enquiry',
    'Other'
]);

function toBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary);
}

function jsonResponse(body, status, origin, requestId) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': origin,
            'Vary': 'Origin',
            'X-Request-ID': requestId
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
        const requestId = crypto.randomUUID();
        if (url.pathname !== '/api/contact') {
            return new Response('Not found', { status: 404 });
        }
        if (request.method !== 'POST') {
            return new Response('Method not allowed', {
                status: 405,
                headers: { Allow: 'POST' }
            });
        }
        const allowedOrigins = (env.ALLOWED_ORIGIN || '')
            .split(',')
            .map(origin => origin.trim())
            .filter(Boolean);
        const origin = request.headers.get('Origin');
        if (!origin || !allowedOrigins.includes(origin)) {
            return jsonResponse({ error: 'Request origin is not allowed.', reference: requestId }, 403, 'null', requestId);
        }
        if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
            return jsonResponse({ error: 'Expected a JSON request.', reference: requestId }, 415, origin, requestId);
        }
        if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES) {
            return jsonResponse({ error: 'Message is too long.', reference: requestId }, 413, origin, requestId);
        }

        let data;
        try {
            data = JSON.parse(await readLimitedBody(request));
        } catch (error) {
            if (error instanceof RangeError) {
                return jsonResponse({ error: 'Message is too long.', reference: requestId }, 413, origin, requestId);
            }
            if (error instanceof SyntaxError) {
                return jsonResponse({ error: 'Invalid form submission.', reference: requestId }, 400, origin, requestId);
            }
            console.error(`Could not read contact form request [${requestId}]:`, error);
            return jsonResponse({ error: 'Could not read your message. Please try again.', reference: requestId }, 400, origin, requestId);
        }

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return jsonResponse({ error: 'Invalid form submission.', reference: requestId }, 400, origin, requestId);
        }
        if (typeof data.website === 'string' && data.website.trim()) {
            return jsonResponse({ ok: true }, 200, origin, requestId);
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
            return jsonResponse({ error: 'Please check the form fields and try again.', reference: requestId }, 400, origin, requestId);
        }

        const missingConfiguration = ['CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL', 'TURNSTILE_SECRET_KEY', 'CONTACT_EMAIL']
            .filter(key => !env[key]);
        if (missingConfiguration.length) {
            console.error(`Contact service is missing required environment configuration: ${missingConfiguration.join(', ')} [${requestId}].`);
            return jsonResponse({ error: 'The contact service is not configured yet.', reference: requestId }, 503, origin, requestId);
        }

        if (typeof data.turnstileToken !== 'string' || !data.turnstileToken || data.turnstileToken.length > 2048) {
            return jsonResponse({ error: 'Please complete the verification and try again.', reference: requestId }, 400, origin, requestId);
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
            console.error(`Turnstile verification request failed [${requestId}]:`, error);
            return jsonResponse({ error: 'Verification is temporarily unavailable. Please try again later.', reference: requestId }, 502, origin, requestId);
        }

        if (!verificationResponse.ok) {
            console.error(`Turnstile verification returned status ${verificationResponse.status} [${requestId}].`);
            return jsonResponse({ error: 'Verification is temporarily unavailable. Please try again later.', reference: requestId }, 502, origin, requestId);
        }

        let verification;
        try {
            verification = await verificationResponse.json();
        } catch (error) {
            console.error(`Turnstile returned an invalid verification response [${requestId}]:`, error);
            return jsonResponse({ error: 'Verification is temporarily unavailable. Please try again later.', reference: requestId }, 502, origin, requestId);
        }
console.log("Origin:", origin);
console.log("Verification:", JSON.stringify(verification));

const allowedHostnames = [
  "damnresize.in",
  "www.damnresize.in"
];

if (
  !verification.success ||
  (verification.hostname &&
   !allowedHostnames.includes(verification.hostname))
) {
    console.error(
      `Turnstile verification failed: ${JSON.stringify(verification)} [${requestId}]`
    );

    return jsonResponse(
      {
        error: 'Verification failed. Please try again.',
        reference: requestId
      },
      400,
      origin,
      requestId
    );
}

        try {
            const safeSubject = subject.replace(/[\r\n]/g, ' ');
            const safeName = name.replace(/["<>]/g, '');
            const fromAddress = env.CONTACT_FROM_EMAIL;
            const body = `Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`;
            const encodedSubject = `=?UTF-8?B?${toBase64(`DamnResize contact: ${safeSubject}`)}?=`;
            const encodedBody = toBase64(body).replace(/.{1,76}/g, '$&\r\n').trim();
            const raw = [
                `From: DamnResize Contact <${fromAddress}>`,
                `To: ${env.CONTACT_TO_EMAIL}`,
                `Reply-To: ${safeName} <${email}>`,
                `Subject: ${encodedSubject}`,
                `Message-ID: <${requestId}@damnresize.in>`,
                `Date: ${new Date().toUTCString()}`,
                'MIME-Version: 1.0',
                'Content-Type: text/plain; charset=UTF-8',
                'Content-Transfer-Encoding: base64',
                '',
                encodedBody
            ].join('\r\n');
            await env.CONTACT_EMAIL.send(new EmailMessage(fromAddress, env.CONTACT_TO_EMAIL, raw));
        } catch (error) {
            const details = error instanceof Error
                ? { name: error.name, message: error.message }
                : { message: String(error) };
            console.error(`Contact email send failed [${requestId}]:`, details);
            return jsonResponse({ error: 'Email delivery failed. Please try again later.', reference: requestId }, 502, origin, requestId);
        }

        return jsonResponse({ ok: true }, 200, origin, requestId);
    }
};
