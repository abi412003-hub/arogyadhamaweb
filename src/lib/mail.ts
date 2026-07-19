// Server-only email helper (Gmail SMTP via nodemailer).
// Do NOT import this into client components — it uses secret credentials.
//
// Required env (set in .env.local / Vercel):
//   SMTP_USER   the sending Google account, e.g. arogyadhama@svyasa.edu.in
//   SMTP_PASS   a 16-char Google App Password (NOT the normal login password)
// Optional env:
//   SMTP_HOST   default "smtp.gmail.com"
//   SMTP_PORT   default 465 (SSL)
//   MAIL_TO     recipient, default "arogyadhama@svyasa.edu.in"
//   MAIL_FROM   From header, default SMTP_USER

import nodemailer, { type Transporter } from "nodemailer";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const MAIL_TO = process.env.MAIL_TO || "arogyadhama@svyasa.edu.in";
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER;

export function mailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS);
}

let cached: Transporter | null = null;
function transporter(): Transporter {
  if (!cached) {
    cached = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // SSL on 465, STARTTLS otherwise
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return cached;
}

const esc = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Render an array of [label, value] rows as an HTML table + plaintext block. */
export function renderRows(rows: Array<[string, string]>): { html: string; text: string } {
  const shown = rows.filter(([, v]) => v != null && String(v).trim() !== "");
  const html = `<table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1b1b1b">
${shown
  .map(
    ([k, v], i) =>
      `<tr style="background:${i % 2 ? "#faf7f2" : "#ffffff"}">` +
      `<td style="border:1px solid #e6ded2;font-weight:600;color:#1B4332;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
      `<td style="border:1px solid #e6ded2;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>`;
  const text = shown.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

/** Send an email to the Arogyadhama inbox. Throws if not configured or on transport error. */
export async function sendMail(opts: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (!mailConfigured()) {
    throw new Error("Mail is not configured (set SMTP_USER and SMTP_PASS).");
  }
  await transporter().sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });
}
