export const FREE_ADDRESS = "rafi-biology.batchpilot.com";
export const CUSTOM_DOMAIN = "rafibiology.com";

export const DNS_RECORDS = [
  { type: "A", name: "@", value: "76.76.21.21", ok: true },
  { type: "CNAME", name: "www", value: "sites.batchpilot.com", ok: false },
];

// Example prices for the search box (per year). Real prices and availability come from the registrar later.
export const ENDINGS = [
  { tld: ".com", price: 1450, taken: false },
  { tld: ".com.bd", price: 1200, taken: false },
  { tld: ".net", price: 1650, taken: true },
  { tld: ".xyz", price: 350, taken: false },
];
