// Adds the "Stay Booking Request" fields to the "Website Registered User" DocType.
// Usage:  node scripts/update-frappe-doctype-booking.mjs
// Reads ERPNEXT_URL / ERPNEXT_API_KEY / ERPNEXT_API_SECRET from .env.local (or the environment).
// Idempotent: only adds fields that are missing. Run after update-frappe-doctype-approval.mjs.
//
// A registered participant requests a stay from their website dashboard; the request is saved on
// their registration so reception sees it next to the registration in the Reception Suite and
// approves both together. confirmation_emailed_on is stamped by the website's cron job once the
// "please visit the campus on your admission date" email has gone out.
import { existsSync, readFileSync } from "node:fs";

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0 && !process.env[line.slice(0, i)]) process.env[line.slice(0, i)] = line.slice(i + 1);
  }
}

const { ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = process.env;
if (!ERPNEXT_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) {
  console.error("Set ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET");
  process.exit(1);
}

const DOCTYPE = "Website Registered User";
const base = ERPNEXT_URL.replace(/\/$/, "");
const url = `${base}/api/resource/DocType/${encodeURIComponent(DOCTYPE)}`;
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
};

const res = await fetch(url, { headers });
if (!res.ok) {
  console.error(`Could not read DocType (${res.status}). Run scripts/create-frappe-doctype.mjs first.`);
  process.exit(1);
}
const doc = (await res.json()).data;
const have = new Set(doc.fields.map((f) => f.fieldname));

const NEW_FIELDS = [
  { fieldname: "sb_stay_booking", fieldtype: "Section Break", label: "Stay Booking Request" },
  { fieldname: "booking_programme", fieldtype: "Data", label: "Programme" },
  { fieldname: "booking_room", fieldtype: "Data", label: "Accommodation" },
  { fieldname: "booking_weeks", fieldtype: "Int", label: "Duration (weeks)" },
  {
    fieldname: "admission_date",
    fieldtype: "Date",
    label: "Admission Date",
    in_list_view: 1,
    in_standard_filter: 1,
    description: "The Tuesday the participant asked to be admitted on.",
  },
  { fieldname: "checkout_date", fieldtype: "Date", label: "Checkout Date" },
  { fieldname: "cb_stay_booking", fieldtype: "Column Break", label: "" },
  { fieldname: "booking_tariff", fieldtype: "Data", label: "Tariff Estimate", description: "All-inclusive estimate at request time." },
  { fieldname: "booking_notes", fieldtype: "Small Text", label: "Participant Notes" },
  { fieldname: "booking_requested_on", fieldtype: "Datetime", label: "Booking Requested On", read_only: 1 },
  {
    fieldname: "confirmation_emailed_on",
    fieldtype: "Datetime",
    label: "Confirmation Emailed On",
    read_only: 1,
    description: "Set by the website once the stay-confirmation email has been sent.",
  },
];

const missing = NEW_FIELDS.filter((f) => !have.has(f.fieldname));
if (!missing.length) {
  console.log("All booking fields already exist — nothing to do.");
  process.exit(0);
}

// Insert right after the Reception Approval section (i.e. before "Personal Details").
const fields = doc.fields.map(({ fieldname, fieldtype, label, ...rest }) => ({ fieldname, fieldtype, label, ...rest }));
const at = fields.findIndex((f) => f.fieldname === "sb_personal");
fields.splice(at < 0 ? fields.length : at, 0, ...missing);
fields.forEach((f, i) => (f.idx = i + 1));

const put = await fetch(url, { method: "PUT", headers, body: JSON.stringify({ fields }) });
const body = await put.text();
if (!put.ok) {
  console.error(`Update failed (${put.status}):`, body.slice(0, 1500));
  process.exit(1);
}
console.log(`Added: ${missing.map((f) => f.fieldname).join(", ")}`);
