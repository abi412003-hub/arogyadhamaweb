// Official Arogyadhama all-inclusive tariff, per person where the room is shared.
// Each list is the cumulative price for [1, 2, 3, 4] weeks (Tuesday → Monday, minimum 6 nights).
// INR applies in India, USD outside India (see useGeoPricing).
//
// The single source for these numbers: the Tariff page, the dashboard stay-booking form and the
// server that records a booking request all read them from here, so they cannot drift apart.
export interface Rates {
  readonly INR: readonly number[];
  readonly USD: readonly number[];
}

export const ROOM_RATES = {
  dormitory: { INR: [6600, 12200, 17800, 23400], USD: [250, 490, 730, 970] },
  single: { INR: [13200, 25400, 37600, 49800], USD: [500, 900, 1300, 1600] },
  "double-sharing": { INR: [11000, 21000, 31000, 41000], USD: [450, 800, 1150, 1450] },
  "double-sharing-ac": { INR: [17600, 34200, 50800, 67400], USD: [500, 900, 1300, 1600] },
  "single-deluxe": { INR: [27500, 54000, 80500, 107000], USD: [850, 1550, 2150, 2750] },
  "semi-deluxe": { INR: [22000, 43000, 64000, 85000], USD: [750, 1350, 1900, 2400] },
  suite: { INR: [30800, 60600, 90400, 120200], USD: [1000, 1800, 2550, 3200] },
} as const satisfies Record<string, Rates>;

export type RoomRateKey = keyof typeof ROOM_RATES;
