/**
 * Test data for the vendor portal, built from the PRD Glossary's vocabulary.
 *
 * No faker. Two reasons, and the second is the real one. Adding a dependency needs a
 * decision, and faker's generators are wrong for this domain anyway: an Indian mobile
 * number is ten digits beginning 6 to 9, and a rupee amount is an exact decimal that
 * clients never compute. A generator that produces plausible-looking wrong values costs
 * more than the twenty lines below.
 *
 * Every factory takes overrides, so a spec states only the field it is about and the
 * reader can see at a glance what the test actually depends on.
 *
 * Uniqueness comes from a per-run counter and the run's start time, not randomness, so a
 * failed run can be reproduced from its artefacts.
 */

const RUN_ID = Date.now().toString(36);
let sequence = 0;

function uniqueSuffix(): string {
  sequence += 1;
  return `${RUN_ID}-${sequence}`;
}

/**
 * A mobile number in the reserved test range.
 *
 * Real Indian mobile numbers begin 6, 7, 8 or 9. These start 9999 so that a number leaking
 * into a real MSG91 send is obvious in the logs rather than silently texting a stranger.
 */
export function testMobile(): string {
  const tail = String(sequence).padStart(6, '0');
  sequence += 1;
  return `9999${tail}`;
}

export type VendorSeed = {
  business_name: string;
  mobile: string;
  service: string;
  city: string;
};

export function makeVendor(overrides: Partial<VendorSeed> = {}): VendorSeed {
  return {
    business_name: `Test Vendor ${uniqueSuffix()}`,
    mobile: testMobile(),
    service: 'Photography',
    city: 'Nagpur',
    ...overrides,
  };
}

export type ListingSeed = {
  title: string;
  service: string;
  /**
   * Rupees, exact decimal, matching Frappe's `Currency`. The suite never multiplies,
   * totals or converts this — every total a vendor sees is computed server-side, and a
   * test that recomputes it is testing its own arithmetic instead of the product.
   */
  price_from: number;
};

export function makeListing(overrides: Partial<ListingSeed> = {}): ListingSeed {
  return {
    title: `Test Listing ${uniqueSuffix()}`,
    service: 'Photography',
    price_from: 85000,
    ...overrides,
  };
}

export type EnquirySeed = {
  listing: string;
  couple_names: string;
  message: string;
};

export function makeEnquiry(overrides: Partial<EnquirySeed> = {}): EnquirySeed {
  return {
    listing: `Test Listing ${uniqueSuffix()}`,
    couple_names: 'Aarti and Rohan',
    message: 'Asking about availability for a December wedding.',
    ...overrides,
  };
}
