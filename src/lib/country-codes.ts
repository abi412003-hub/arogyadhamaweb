// Shared (client + server): country codes offered for participant sign-in.
// `min`/`max` = allowed number of mobile digits after the code.
export interface CountryCode {
  code: string;
  country: string;
  flag: string;
  min: number;
  max: number;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: "+91", country: "India", flag: "🇮🇳", min: 10, max: 10 },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸", min: 10, max: 10 },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", min: 10, max: 10 },
  { code: "+61", country: "Australia", flag: "🇦🇺", min: 9, max: 9 },
  { code: "+971", country: "UAE", flag: "🇦🇪", min: 9, max: 9 },
  { code: "+65", country: "Singapore", flag: "🇸🇬", min: 8, max: 8 },
  { code: "+49", country: "Germany", flag: "🇩🇪", min: 10, max: 11 },
  { code: "+33", country: "France", flag: "🇫🇷", min: 9, max: 9 },
];

export const findCountryCode = (code: string) => COUNTRY_CODES.find((c) => c.code === code);
