// Checks the website → patient app hand-off signer (src/lib/patient-handoff.ts).
//
//   node scripts/check-handoff.mjs
//
// The VECTOR is shared with arogya-patient-app `scripts/check-handoff.ts`, whose verifier must
// accept exactly this token for exactly this secret and payload — so the two can never drift.
// Node 24 strips the TypeScript types from the imported module on its own.
import { createHmac } from "node:crypto";

import {
  handoffEnabled,
  patientAppHandoffUrl,
  signHandoffToken,
} from "../src/lib/patient-handoff.ts";

const SECRET = "test-handoff-secret-0123456789abcdef0123456789abcdef";
const VECTOR =
  "v1.eyJhdWQiOiJwYXRpZW50LWFwcC1oYW5kb2ZmIiwic3ViIjoiSVAtVEVTVC0wMDAxIiwid3J1IjoiKzkxNjAwMDAwMDA5OSIsImlhdCI6MTc5NTAwMDAwMCwiZXhwIjoxNzk1MDAwMDkwLCJqdGkiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBIn0.0F7MIU7NgZOvHDQs_RfRCECCdXfYm94Vp3OH4VJmnNQ";

let failed = 0;
function check(name, ok) {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}`);
  if (!ok) failed++;
}

const token = signHandoffToken({ sub: "IP-TEST-0001", wru: "+916000000099" }, SECRET, {
  now: 1795000000,
  jti: "AAAAAAAAAAAAAAAAAAAAAA",
});
check("the shared payload signs to the shared vector", token === VECTOR);

// Independent verification, the way the patient app does it.
const [v, body, sig] = token.split(".");
const expected = createHmac("sha256", SECRET).update("patient-app-handoff.v1." + body).digest("base64url");
const claims = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
check("version prefix is v1", v === "v1");
check("signature verifies", sig === expected);
check("audience is the hand-off audience", claims.aud === "patient-app-handoff");
check("lifetime is 90 seconds", claims.exp - claims.iat === 90);

const fresh = signHandoffToken({ sub: "IP-1", wru: "+91x" }, SECRET);
const fresh2 = signHandoffToken({ sub: "IP-1", wru: "+91x" }, SECRET);
check("each token gets its own id", fresh !== fresh2);

const on = { PATIENT_HANDOFF_ENABLED: "1", PATIENT_HANDOFF_SECRET: SECRET };
check("enabled with the flag and a secret", handoffEnabled(on));
check("off without the flag", !handoffEnabled({ PATIENT_HANDOFF_SECRET: SECRET }));
check("off with a short secret", !handoffEnabled({ PATIENT_HANDOFF_ENABLED: "1", PATIENT_HANDOFF_SECRET: "short" }));
check("off with nothing set", !handoffEnabled({}));

const url = patientAppHandoffUrl("https://patient.example/", { sub: "IP-1", wru: "+91x" }, on);
check(
  "builds the patient-app hand-off URL",
  typeof url === "string" && url.startsWith("https://patient.example/api/handoff?token=v1."),
);
check(
  "no URL while switched off",
  patientAppHandoffUrl("https://patient.example", { sub: "IP-1", wru: "+91x" }, {}) === null,
);

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nall hand-off checks passed");
