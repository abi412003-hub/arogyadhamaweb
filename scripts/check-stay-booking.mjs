// Checks the stay-booking rules (src/lib/stay-booking.ts) that the dashboard form and the
// booking API both rely on: admission Tuesdays, Tuesday→Monday checkout, the official tariff,
// currency by country, and server-side validation of a request.
//
//   npm run check:stay-booking
import {
  STAY_PROGRAMMES, STAY_ROOMS, admissionDates, checkoutDate, currencyForCountry, formatMoney,
  longDate, nightsFor, stayTariff, validateStayRequest, weekday,
} from "../src/lib/stay-booking.ts";
import { ROOM_RATES } from "../src/lib/tariff-rates.ts";

let failed = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${!ok && detail ? `\n       ${detail}` : ""}`);
  if (!ok) failed++;
}

// 2026-11-21 is a Saturday (09:00 IST).
const SAT = new Date("2026-11-21T03:30:00Z");
const dates = admissionDates(SAT);
check("admission dates are all Tuesdays", dates.every((d) => weekday(d) === 2), dates.join(","));
check("the first admission is the next Tuesday with 2 days' notice", dates[0] === "2026-11-24", dates[0]);
check("twelve weeks of admission dates are offered", dates.length === 12 && dates[11] === "2027-02-09", dates[11]);

// Monday 23 Nov 2026 at 23:30 IST is still Monday on campus: Tuesday 24th is only 1 day away.
const MON_NIGHT = new Date("2026-11-23T18:00:00Z");
check("less than 2 days' notice skips to the following Tuesday", admissionDates(MON_NIGHT)[0] === "2026-12-01", admissionDates(MON_NIGHT)[0]);

check("1 week checks out on the Monday (6 nights)", checkoutDate("2026-11-24", 1) === "2026-11-30" && nightsFor(1) === 6);
check("4 weeks check out 27 days later (27 nights)", checkoutDate("2026-11-24", 4) === "2026-12-21" && nightsFor(4) === 27);
check("checkout crosses the year end", checkoutDate("2026-12-29", 2) === "2027-01-11");
check("long dates read naturally", longDate("2026-11-24") === "Tuesday, 24 November 2026" || longDate("2026-11-24") === "Tuesday 24 November 2026", longDate("2026-11-24"));

check("India pays in rupees", currencyForCountry("India") === "INR" && currencyForCountry("") === "INR");
check("outside India pays in dollars", currencyForCountry("United Kingdom") === "USD");
check("single room, 2 weeks, INR = ₹25,400", stayTariff("single", 2, "INR") === 25400 && formatMoney(25400, "INR") === "₹25,400");
check("suite, 4 weeks, USD = $3,200", stayTariff("suite", 4, "USD") === 3200);
check("an unknown room has no tariff", stayTariff("penthouse", 1, "INR") === null);
check("5 weeks is not offered", stayTariff("single", 5, "INR") === null);
check("every room on the form has a rate", STAY_ROOMS.every((r) => ROOM_RATES[r.key]?.INR.length === 4));
check("eleven programmes are offered", STAY_PROGRAMMES.length === 11);

const good = { programme: "diabetes", room: "single", weeks: 2, admissionDate: "2026-12-01", email: "demo@example.test", notes: " Vegetarian " };
const v = validateStayRequest(good, "India", SAT);
check(
  "a good request is accepted and derived server-side",
  v.ok && v.value.checkoutDate === "2026-12-14" && v.value.tariff === 25400 && v.value.currency === "INR" && v.value.notes === "Vegetarian",
  JSON.stringify(v),
);
check("a Wednesday admission is refused", !validateStayRequest({ ...good, admissionDate: "2026-12-02" }, "India", SAT).ok);
check("a past Tuesday is refused", !validateStayRequest({ ...good, admissionDate: "2026-11-17" }, "India", SAT).ok);
check("an unknown programme is refused", !validateStayRequest({ ...good, programme: "astrology" }, "India", SAT).ok);
check("an unknown room is refused", !validateStayRequest({ ...good, room: "penthouse" }, "India", SAT).ok);
check("0 weeks is refused", !validateStayRequest({ ...good, weeks: 0 }, "India", SAT).ok);
check("a missing email is refused", !validateStayRequest({ ...good, email: "" }, "India", SAT).ok);
check("an overseas guest is quoted in dollars", validateStayRequest(good, "USA", SAT).ok && validateStayRequest(good, "USA", SAT).value.tariff === 900);

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nall stay-booking checks passed");
