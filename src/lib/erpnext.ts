// Server-only ERPNext (Frappe) REST client.
// Do NOT import this into client components — it uses secret credentials.
//
// Required env (set in .env.local / Vercel):
//   ERPNEXT_URL         e.g. https://arogyadhama.m.frappe.cloud
//   ERPNEXT_API_KEY     API key of a Frappe user with create rights
//   ERPNEXT_API_SECRET  matching API secret
//
// Token auth: Authorization: token <key>:<secret>
// Docs: https://frappeframework.com/docs/user/en/api/rest

const ERPNEXT_URL = process.env.ERPNEXT_URL;
const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY;
const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET;

export function erpnextConfigured(): boolean {
  return Boolean(ERPNEXT_URL && ERPNEXT_API_KEY && ERPNEXT_API_SECRET);
}

/** Create a document of `doctype` in ERPNext. Returns the created doc. */
export async function createDoc(
  doctype: string,
  doc: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  if (!erpnextConfigured()) {
    throw new Error(
      "ERPNext is not configured (set ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET).",
    );
  }

  const base = ERPNEXT_URL!.replace(/\/$/, "");
  const res = await fetch(`${base}/api/resource/${encodeURIComponent(doctype)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
    },
    body: JSON.stringify(doc),
    cache: "no-store",
  });

  const raw = await res.text();
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    data = { _raw: raw };
  }

  if (!res.ok) {
    const detail =
      data?._server_messages || data?.exception || data?.message || `HTTP ${res.status}`;
    throw new Error(
      `ERPNext create ${doctype} failed: ${
        typeof detail === "string" ? detail : JSON.stringify(detail)
      }`,
    );
  }

  return data?.data ?? data;
}
