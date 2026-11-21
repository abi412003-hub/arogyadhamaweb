// Server-only: the "your stay is confirmed — please visit our campus on <date>" email.
//
// Reception approves a registration and its stay request in the Reception Suite. That app has no
// mail account, so this website — which does — sends the confirmation: a cron job
// (/api/cron/stay-confirmations) looks for approved registrations with a stay request whose
// confirmation has not gone out, emails each person once, and stamps `confirmation_emailed_on`.
import { getList, updateDoc } from "@/lib/erpnext";
import { mailConfigured, sendMail } from "@/lib/mail";
import { BOOKING_FIELDS, PARTICIPANT_DOCTYPE, PATIENT_APP_URL, frappeNow } from "@/lib/participants";
import { CAMPUS, campusToday, longDate, shortDate } from "@/lib/stay-booking";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.svyasaarogyadhama.com").replace(/\/$/, "");

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function renderStayConfirmation(doc: Record<string, any>): { subject: string; html: string; text: string } {
  const name = String(doc.full_name || "Participant").trim();
  const admission = String(doc.admission_date || "");
  const checkout = String(doc.checkout_date || "");
  const weeks = Number(doc.booking_weeks) || 0;
  const rows: Array<[string, string]> = [
    ["Programme", String(doc.booking_programme || "")],
    ["Accommodation", String(doc.booking_room || "")],
    ["Please arrive on", longDate(admission)],
    ["Checkout", checkout ? longDate(checkout) : ""],
    ["Duration", weeks ? `${weeks} week${weeks > 1 ? "s" : ""} (${weeks * 7 - 1} nights)` : ""],
    ["Tariff (all-inclusive)", String(doc.booking_tariff || "")],
    ["Patient ID", String(doc.patient || "")],
  ].filter(([, v]) => v) as Array<[string, string]>;

  const subject = `Your stay at S-VYASA Arogyadhama is confirmed — please visit us on ${shortDate(admission)}`;

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #f0e6e8;color:#7a6a6e;font-size:13px;width:42%">${esc(k)}</td><td style="padding:10px 14px;border-bottom:1px solid #f0e6e8;color:#1b4332;font-size:14px;font-weight:600">${esc(v)}</td></tr>`,
    )
    .join("");
  const bring = [
    "A government photo ID (Aadhaar, passport or driving licence)",
    "Your previous medical reports and current prescriptions",
    "The medicines you are taking now, for the duration of your stay",
    "Comfortable, loose clothing for yoga and therapies",
  ];

  const html = `<!doctype html><html><body style="margin:0;background:#faf5f6;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf5f6;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #efe2e5">
<tr><td style="background:linear-gradient(135deg,#2e0b14,#4f1622 55%,#5c2333);padding:28px 32px;color:#fefae0">
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#e0b13a;font-weight:bold">Stay confirmed</div>
<div style="font-size:24px;font-weight:bold;margin-top:6px;font-family:Georgia,serif">S-VYASA Arogyadhama</div>
<div style="font-size:13px;color:#f3e9d2;margin-top:2px">Prashanti Kutiram · Bengaluru</div>
</td></tr>
<tr><td style="padding:28px 32px 8px;color:#1b4332;font-size:15px;line-height:1.6">
<p style="margin:0 0 12px">Dear ${esc(name)},</p>
<p style="margin:0 0 12px">Namaste. We are pleased to confirm your stay at <b>S-VYASA Arogyadhama, Prashanti Kutiram</b>. Our reception team has reviewed your registration and reserved your admission.</p>
<div style="margin:18px 0;padding:16px 18px;border-radius:12px;background:#fdf7e7;border:1px solid #f1dfa8;color:#1b4332">
<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#a07810;font-weight:bold">Please visit our campus on</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px;font-family:Georgia,serif;color:#4f1622">${esc(longDate(admission))}</div>
<div style="font-size:13px;margin-top:4px;color:#5d5155">Report to the main reception at Prashanti Kutiram, where our team will complete your admission.</div>
</div>
</td></tr>
<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0e6e8;border-radius:12px;overflow:hidden">${tableRows}</table></td></tr>
<tr><td style="padding:22px 32px 6px;color:#1b4332;font-size:14px;line-height:1.6">
<div style="font-weight:bold;margin-bottom:6px">Please bring</div>
<ul style="margin:0 0 14px;padding-left:20px">${bring.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
<p style="margin:0 0 12px">No advance payment is needed. The tariff is settled at the campus reception on admission, and accommodation is allotted by reception on arrival.</p>
<p style="margin:0 0 12px">Your <b>Arogyadhama Patient App</b> login (email and password) is sent in a separate email. Once you are admitted, the app shows your daily schedule, diet, therapies and reports: <a href="${esc(PATIENT_APP_URL)}/login" style="color:#4f1622">${esc(PATIENT_APP_URL.replace(/^https?:\/\//, ""))}</a>.</p>
</td></tr>
<tr><td style="padding:6px 32px 26px">
<div style="padding:16px 18px;border-radius:12px;background:#f7f2f3;color:#3e3437;font-size:13px;line-height:1.6">
<b style="color:#4f1622">How to reach us</b><br>${esc(CAMPUS.address)}<br>
<a href="${esc(SITE_URL)}/plan-your-stay/how-to-reach" style="color:#4f1622">Directions and travel options</a><br><br>
<b style="color:#4f1622">Need help?</b> Call ${CAMPUS.phones.map(esc).join(" or ")} · <a href="mailto:${esc(CAMPUS.email)}" style="color:#4f1622">${esc(CAMPUS.email)}</a>
</div>
<p style="margin:18px 0 0;color:#1b4332;font-size:14px">We look forward to welcoming you.<br><b>Reception, S-VYASA Arogyadhama</b></p>
</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    `Dear ${name},`,
    "",
    "Namaste. We are pleased to confirm your stay at S-VYASA Arogyadhama, Prashanti Kutiram.",
    "",
    `PLEASE VISIT OUR CAMPUS ON: ${longDate(admission)}`,
    "Report to the main reception at Prashanti Kutiram, where our team will complete your admission.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Please bring:",
    ...bring.map((b) => `- ${b}`),
    "",
    "No advance payment is needed. The tariff is settled at the campus reception on admission.",
    `Your Arogyadhama Patient App login is sent in a separate email: ${PATIENT_APP_URL}/login`,
    "",
    `Address: ${CAMPUS.address}`,
    `Directions: ${SITE_URL}/plan-your-stay/how-to-reach`,
    `Help: ${CAMPUS.phones.join(" / ")} · ${CAMPUS.email}`,
    "",
    "We look forward to welcoming you.",
    "Reception, S-VYASA Arogyadhama",
  ].join("\n");

  return { subject, html, text };
}

export interface ConfirmationRun {
  configured: boolean;
  checked: number;
  sent: string[];
  failed: string[];
}

/**
 * Email every approved stay whose confirmation hasn't gone out yet (admission not in the past).
 * With `loginId`, only that one registration — what the Reception Suite asks for the moment it
 * approves, so the mail arrives right away rather than at the next cron tick.
 */
export async function runStayConfirmations(limit = 20, loginId?: string): Promise<ConfirmationRun> {
  if (!mailConfigured()) return { configured: false, checked: 0, sent: [], failed: [] };
  const rows = await getList(PARTICIPANT_DOCTYPE, {
    filters: [
      ...(loginId ? [["name", "=", loginId]] : []),
      ["approval_status", "=", "Approved"],
      ["admission_date", "is", "set"],
      ["admission_date", ">=", campusToday()],
      ["confirmation_emailed_on", "is", "not set"],
      ["email", "is", "set"],
    ],
    fields: ["name", "full_name", "email", "patient", ...BOOKING_FIELDS],
    limit,
  });
  const run: ConfirmationRun = { configured: true, checked: rows.length, sent: [], failed: [] };
  for (const doc of rows) {
    const { subject, html, text } = renderStayConfirmation(doc);
    try {
      await sendMail({ to: String(doc.email), subject, html, text, replyTo: CAMPUS.email });
      await updateDoc(PARTICIPANT_DOCTYPE, doc.name, { confirmation_emailed_on: frappeNow() });
      run.sent.push(String(doc.name));
    } catch (e) {
      console.error(`stay-confirmations: ${doc.name} failed:`, e);
      run.failed.push(String(doc.name));
    }
  }
  return run;
}
