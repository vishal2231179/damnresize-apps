<div align="center">

<img src="damnresize-v4-dark.svg" alt="DamnResize.in" width="310">

### Free image, photo, signature & PDF tools

Prepare images for online forms, resize and compress photos, add name/date stamps, and explore everyday file utilities—all from one simple website.

[![Live website](https://img.shields.io/badge/Live-damnresize.in-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://damnresize.in/)
[![Built with HTML](https://img.shields.io/badge/HTML-static%20website-e34f26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![License](https://img.shields.io/badge/License-Proprietary-334155?style=for-the-badge)](#license)

</div>

---

## About

**DamnResize.in** is a collection of browser-accessible utilities for students, job applicants, creators, and anyone who needs to prepare an image or document for an online form.

The project is built as a lightweight static website using individual HTML pages, shared navigation, and page-level JavaScript. Tool behavior and file handling can vary by feature; check the relevant tool page before using it with sensitive files.

## Tools

### Images, photos & signatures

| Tool | What it helps with |
| --- | --- |
| [Exam Photo & Signature](exams.html) | Prepare a photo and signature using available exam presets. Always verify current application requirements. |
| [Photo Name & Date Stamper](AddText.html) | Add custom text to a photo and adjust its appearance. |
| [Image Resizer](resizer.html) | Resize an image to chosen pixel dimensions. |
| [Image Compressor](compress.html) | Reduce image file size by adjusting compression quality. |
| [Crop Image](crop.html) | Crop an image to focus on the desired area. |
| [Format Converter](convert.html) | Convert between supported image formats. |
| [Bulk Processing](bulk.html) | Process multiple images in one workflow. |
| [Passport Photo Studio](ImageGenerator.html) | Edit a passport-style photo background and output size. |
| [Utility Toolkit](utilities.html) | Explore additional image utilities. |
| [Document Scanner](document-scanner.html) | Scan documents and prepare PDF output. |

### PDF tools

**Convert to PDF:** [JPG](jpg-to-pdf.html) · [Word](word-to-pdf.html) · [PowerPoint](ppt-to-pdf.html) · [Excel](excel-to-pdf.html) · [HTML](html-to-pdf.html)

**Convert from PDF:** [JPG](pdf-to-jpg.html) · [Word](pdf-to-word.html) · [PowerPoint](pdf-to-ppt.html) · [Excel](pdf-to-excel.html) · [PDF/A](pdf-to-pdfa.html)

## Getting started

### Use the live website

Visit **[damnresize.in](https://damnresize.in/)** and choose the tool that matches your task.

### Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. For a local web server, use any static-file server from the project directory, for example:

   ```bash
   npx serve .
   ```

The static pages have no required build step. The contact form's email endpoint does require the separate Cloudflare Worker setup below. Tailwind CSS and Font Awesome are loaded from CDNs, so an internet connection is needed for those assets.

### Contact form email setup

The contact form sends messages through a Cloudflare Worker and Cloudflare Email Service. Before deploying it:

1. In Cloudflare Email Routing, add and verify the destination inbox where you want to receive submissions, then create a rule forwarding `support@damnresize.in` to that address.
2. In Cloudflare Email Sending, onboard `damnresize.in` and complete the DNS setup Cloudflare provides.
3. Create a Cloudflare Turnstile widget that allows the `damnresize.in` hostname. Configure its public site key in `contact.html`; keep its secret key private.
4. In a terminal with Node.js installed, run `npx wrangler login` from the project folder.
5. Set the recipient inbox and Turnstile secret as Worker secrets:

   ```bash
   npx wrangler secret put CONTACT_TO_EMAIL --config contact-worker/wrangler.toml
   npx wrangler secret put TURNSTILE_SECRET_KEY --config contact-worker/wrangler.toml
   ```

6. Deploy the Worker:

   ```bash
   npx wrangler deploy --config contact-worker/wrangler.toml
   ```

The Worker route supports the website at both `https://damnresize.in` and `https://www.damnresize.in` through Cloudflare. Cloudflare Email Routing forwards incoming messages for `support@damnresize.in`; the contact form sends to the verified inbox stored in the `CONTACT_TO_EMAIL` Worker secret. The sender address is `support@damnresize.in`, and visitors' addresses are set as Reply-To. No Resend account or API key is needed. Never put Worker secrets in website HTML or JavaScript.

After deployment, submit a test message from the live Contact page and confirm it reaches the forwarded inbox. Failed requests show a reference ID; search the Worker logs for the same ID to find the server-side cause. Form submissions contain personal contact details; see the [Privacy Policy](privacy.html).

## Project structure

```text
.
├── index.html                # Homepage and quick image tool
├── exams.html                # Exam photo and signature presets
├── AddText.html              # Photo name/date stamper
├── ImageGenerator.html       # Passport photo studio
├── resizer.html              # Image resizer
├── compress.html             # Image compressor
├── crop.html                 # Image cropper
├── convert.html              # Image format converter
├── bulk.html                 # Bulk image processing
├── utilities.html            # Utility toolkit
├── document-scanner.html     # Scan to PDF
├── *-to-*.html               # Individual PDF conversion tools
├── privacy.html              # Privacy policy
├── about.html                # About the project
├── contact.html              # Contact form and support details
├── terms.html                # Terms of use
├── navigation.js             # Shared navigation behavior and styles
├── contact-worker/
│   ├── worker.js             # Contact form email endpoint
│   └── wrangler.toml         # Cloudflare Worker configuration
├── sitemap.xml               # Search-engine sitemap
└── robots.txt                # Crawler rules and sitemap location
```

## For contributors

- Keep the current visual language and responsive layouts consistent.
- Preserve individual tool behavior when updating shared UI.
- Test the affected page in desktop and mobile-sized viewports.
- Keep page titles, descriptions, canonical URLs, `sitemap.xml`, and internal links in sync when adding or renaming a public page.
- Avoid claims such as “100% secure,” “never uploaded,” or guaranteed exam acceptance unless they are verified for the specific tool.

## Important notes

- Exam and application rules can change. Presets are starting points, not official requirements or a guarantee of acceptance; follow the current notice from the relevant organization.
- DamnResize.in is an independent utility website and is not affiliated with government departments, exam authorities, or recruitment organizations.
- Processing and privacy behavior may differ between tools. Review the [Privacy Policy](privacy.html) and the information on the specific tool page.
- Contact: [support@damnresize.in](mailto:support@damnresize.in)

## License

This repository does not currently include an open-source license. Unless the project owner adds one, the source code and design remain proprietary; do not assume permission to redistribute or reuse them.

<div align="center">

Made for students, applicants, creators, and everyday file tasks.

**[Open DamnResize.in](https://damnresize.in/)**

</div>
