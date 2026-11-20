// Adds reception-approval fields to the "Website Registered User" DocType.
// Usage:  node scripts/update-frappe-doctype-approval.mjs
// Reads ERPNEXT_URL / ERPNEXT_API_KEY / ERPNEXT_API_SECRET from .env.local (or the environment).
// Idempotent: only adds fields that are missing.
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

// New fields go in a "Reception Approval" section right after the Account section.
const NEW_FIELDS = [
  { fieldname: "sb_approval", fieldtype: "Section Break", label: "Reception Approval" },
  {
    fieldname: "approval_status",
    fieldtype: "Select",
    label: "Approval Status",
    options: "Pending Approval\nApproved\nRejected",
    default: "Pending Approval",
    reqd: 1,
    in_list_view: 1,
    in_standard_filter: 1,
    description: "Only Approved users can sign in to the website dashboard.",
  },
  {
    fieldname: "patient",
    fieldtype: "Link",
    label: "Patient",
    options: "Patient",
    in_list_view: 1,
    description: "Auto-filled when exactly one Patient has this mobile. Check or choose before approving.",
  },
  {
    fieldname: "patient_name",
    fieldtype: "Data",
    label: "Patient Name",
    read_only: 1,
    fetch_from: "patient.patient_name",
  },
  { fieldname: "cb_approval", fieldtype: "Column Break", label: "" },
  {
    fieldname: "reception_remarks",
    fieldtype: "Small Text",
    label: "Reception Remarks",
    description: "Shown to the person if the registration is rejected.",
  },
];

const missing = NEW_FIELDS.filter((f) => !have.has(f.fieldname));
if (!missing.length) {
  console.log("All approval fields already exist — nothing to do.");
  process.exit(0);
}

// Insert before the "Personal Details" section (i.e. right after the Account section).
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
