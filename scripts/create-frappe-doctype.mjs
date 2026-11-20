// One-off: create the "Website Registered User" DocType in the Arogyadhama Frappe Cloud.
// Usage:  node scripts/create-frappe-doctype.mjs
// Reads ERPNEXT_URL / ERPNEXT_API_KEY / ERPNEXT_API_SECRET from .env.local (or the environment).
// Idempotent: does nothing if the DocType already exists.
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
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
};

const existing = await fetch(`${base}/api/resource/DocType/${encodeURIComponent(DOCTYPE)}`, { headers });
if (existing.ok) {
  console.log(`DocType "${DOCTYPE}" already exists — nothing to do.`);
  process.exit(0);
}

const f = (fieldname, fieldtype, label, extra = {}) => ({ fieldname, fieldtype, label, ...extra });

const fields = [
  f("sb_account", "Section Break", "Account"),
  f("full_name", "Data", "Full Name", { reqd: 1, in_list_view: 1, in_standard_filter: 1 }),
  f("login_id", "Data", "Login ID (Country Code + Mobile)", { reqd: 1, unique: 1, read_only: 1 }),
  f("country_code", "Data", "Country Code", { default: "+91" }),
  f("mobile", "Data", "Mobile", { reqd: 1, in_list_view: 1, in_standard_filter: 1 }),
  f("cb_account", "Column Break", ""),
  f("status", "Select", "Status", { options: "Active\nInactive", default: "Active", in_list_view: 1 }),
  f("mobile_verified", "Check", "Mobile Verified", { default: "0" }),
  f("source", "Data", "Source", { default: "Website" }),
  f("last_login", "Datetime", "Last Login", { read_only: 1 }),

  // Reception approval (also added to an existing install by update-frappe-doctype-approval.mjs).
  f("sb_approval", "Section Break", "Reception Approval"),
  f("approval_status", "Select", "Approval Status", {
    options: "Pending Approval\nApproved\nRejected",
    default: "Pending Approval",
    reqd: 1,
    in_list_view: 1,
    in_standard_filter: 1,
    description: "Only Approved users can sign in to the website dashboard.",
  }),
  f("patient", "Link", "Patient", {
    options: "Patient",
    in_list_view: 1,
    description: "Auto-filled when exactly one Patient has this mobile. Check or choose before approving.",
  }),
  f("patient_name", "Data", "Patient Name", { read_only: 1, fetch_from: "patient.patient_name" }),
  f("cb_approval", "Column Break", ""),
  f("reception_remarks", "Small Text", "Reception Remarks", {
    description: "Shown to the person if the registration is rejected.",
  }),

  f("sb_personal", "Section Break", "Personal Details"),
  f("email", "Data", "Email", { options: "Email", in_list_view: 1 }),
  f("gender", "Select", "Gender", { options: "\nMale\nFemale\nOther" }),
  f("cb_personal", "Column Break", ""),
  f("date_of_birth", "Date", "Date of Birth"),

  f("sb_address", "Section Break", "Address"),
  f("city", "Data", "City", { in_standard_filter: 1 }),
  f("state", "Data", "State"),
  f("cb_address", "Column Break", ""),
  f("country", "Data", "Country", { default: "India" }),

  f("sb_health", "Section Break", "Health"),
  f("health_concern", "Small Text", "Primary Health Concern"),

  f("sb_emergency", "Section Break", "Emergency Contact"),
  f("emergency_contact_name", "Data", "Emergency Contact Name"),
  f("cb_emergency", "Column Break", ""),
  f("emergency_contact_phone", "Data", "Emergency Contact Phone"),
];

const doc = {
  doctype: "DocType",
  name: DOCTYPE,
  module: "Arogyadhama Health",
  custom: 1,
  autoname: "field:login_id",
  naming_rule: "By fieldname",
  title_field: "full_name",
  show_title_field_in_link: 1,
  search_fields: "full_name,mobile,email",
  sort_field: "creation",
  sort_order: "DESC",
  track_changes: 1,
  fields,
  permissions: [
    { role: "System Manager", read: 1, write: 1, create: 1, delete: 1, report: 1, export: 1, print: 1, email: 1, share: 1 },
  ],
};

const res = await fetch(`${base}/api/resource/DocType`, {
  method: "POST",
  headers,
  body: JSON.stringify(doc),
});
const body = await res.text();
if (!res.ok) {
  console.error(`Failed (${res.status}):`, body.slice(0, 1500));
  process.exit(1);
}
console.log(`Created DocType "${DOCTYPE}".`);
