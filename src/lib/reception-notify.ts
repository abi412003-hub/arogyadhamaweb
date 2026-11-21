// Server-only: emails the reception inbox when a participant requests a stay, so it gets
// approved in the Reception Suite (Registrations page). Best-effort — never fails the request.
import { mailConfigured, renderRows, sendMail } from "@/lib/mail";

export async function notifyReceptionOfBooking(doc: Record<string, unknown>, docName: string) {
  if (!mailConfigured()) return;
  const suiteBase = (process.env.RECEPTION_SUITE_URL || "").trim().replace(/\/$/, "");
  const suiteLink = suiteBase ? `${suiteBase}/registrations` : "";
  const deskBase = (process.env.ERPNEXT_URL || "").replace(/\/$/, "");
  const deskLink = deskBase ? `${deskBase}/app/website-registered-user/${encodeURIComponent(docName)}` : "";
  const link = suiteLink || deskLink;

  const { html, text } = renderRows([
    ["Full Name", String(doc.full_name ?? "")],
    ["Mobile", `${doc.country_code ?? ""} ${doc.mobile ?? ""}`],
    ["Email", String(doc.email ?? "")],
    ["Programme", String(doc.booking_programme ?? "")],
    ["Accommodation", String(doc.booking_room ?? "")],
    ["Stay", `${doc.booking_weeks ?? ""} week(s): ${doc.admission_date ?? ""} → ${doc.checkout_date ?? ""}`],
    ["Tariff estimate", String(doc.booking_tariff ?? "")],
    ["Notes", String(doc.booking_notes ?? "")],
    ["Health concern", String(doc.health_concern ?? "")],
    ["Matched Patient", doc.patient ? String(doc.patient) : "None found — link or create one when approving"],
    ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ]);
  try {
    await sendMail({
      subject: `Stay booking request awaiting approval — ${doc.full_name} (${doc.admission_date})`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px">A registered participant has requested a stay from their website dashboard and is waiting for reception to confirm it.</p>${html}${
        link
          ? `<p style="font-family:Arial,sans-serif;font-size:14px">Review and approve it ${suiteLink ? "in the Reception Suite (Registrations)" : "in Frappe"}: <a href="${link}">${link}</a></p>`
          : ""
      }`,
      text: `New stay booking request awaiting approval:\n\n${text}${link ? `\n\nReview and approve: ${link}` : ""}`,
    });
  } catch (e) {
    console.error("stay-booking → reception email failed (non-fatal):", e);
  }
}
