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

/** Error carrying the HTTP status Frappe answered with (404 = not found, 409 = duplicate, …). */
export class FrappeError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function frappeRequest(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
): Promise<any> {
  if (!erpnextConfigured()) {
    throw new FrappeError(
      "ERPNext is not configured (set ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET).",
      503,
    );
  }

  const base = ERPNEXT_URL!.replace(/\/$/, "");
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
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
    throw new FrappeError(
      `ERPNext ${method} ${path} failed: ${
        typeof detail === "string" ? detail : JSON.stringify(detail)
      }`,
      res.status,
    );
  }

  return data?.data ?? data;
}

const resource = (doctype: string, name?: string) =>
  `/api/resource/${encodeURIComponent(doctype)}${name ? `/${encodeURIComponent(name)}` : ""}`;

/** Create a document of `doctype` in ERPNext. Returns the created doc. */
export async function createDoc(
  doctype: string,
  doc: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  return frappeRequest("POST", resource(doctype), doc);
}

/** Fetch one document by name. Returns null if it does not exist. */
export async function getDoc(
  doctype: string,
  name: string,
): Promise<Record<string, any> | null> {
  try {
    return await frappeRequest("GET", resource(doctype, name));
  } catch (e) {
    if (e instanceof FrappeError && e.status === 404) return null;
    throw e;
  }
}

/** List documents matching Frappe-style filters, e.g. [["mobile", "like", "%98765%"]]. */
export async function getList(
  doctype: string,
  opts: { filters?: unknown[]; fields?: string[]; limit?: number } = {},
): Promise<Record<string, any>[]> {
  const q = new URLSearchParams({
    fields: JSON.stringify(opts.fields ?? ["name"]),
    filters: JSON.stringify(opts.filters ?? []),
    limit_page_length: String(opts.limit ?? 20),
  });
  const data = await frappeRequest("GET", `${resource(doctype)}?${q}`);
  return Array.isArray(data) ? data : [];
}

/** Update fields on an existing document. Returns the updated doc. */
export async function updateDoc(
  doctype: string,
  name: string,
  patch: Record<string, unknown>,
): Promise<Record<string, any>> {
  return frappeRequest("PUT", resource(doctype, name), patch);
}
