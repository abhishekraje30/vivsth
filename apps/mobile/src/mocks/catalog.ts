/**
 * Mock catalog — ported from the prototype's assets/data.js.
 *
 * Placeholder until `vivahspot_backend.api.mobile.v1.*` exists. Shapes here deliberately
 * mirror the prototype rather than the eventual DocTypes; the API contract in
 * @vivahspot/shared will replace this wholesale.
 *
 * Images must be required statically — Metro resolves require() at build time, so a
 * computed path would silently fail.
 */

export type Category = {
  slug: string;
  name: string;
  image: number;
};

export type Vendor = {
  id: string;
  cat: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  unit: string;
  verified: boolean;
  image: number;
};

export const CATEGORIES: Category[] = [
  { slug: 'venues', name: 'Lawns & Venues', image: require('@/assets/catalog/cat-venues.jpg') },
  { slug: 'catering', name: 'Catering', image: require('@/assets/catalog/cat-catering.jpg') },
  { slug: 'decoration', name: 'Decoration', image: require('@/assets/catalog/cat-decoration.jpg') },
  { slug: 'photography', name: 'Photography', image: require('@/assets/catalog/cat-photography.jpg') },
  { slug: 'makeup', name: 'Makeup & Mehndi', image: require('@/assets/catalog/cat-makeup.jpg') },
  { slug: 'music', name: 'DJ & Music', image: require('@/assets/catalog/cat-music.jpg') },
];

export const VENDORS: Vendor[] = [
  {
    id: 'green-meadows', cat: 'venues', name: 'Green Meadows Lawn', city: 'Kothrud, Pune',
    rating: 4.8, reviews: 128, priceFrom: 85000, unit: 'day', verified: true,
    image: require('@/assets/catalog/feat-venue.jpg'),
  },
  {
    id: 'annapurna', cat: 'catering', name: 'Annapurna Caterers', city: 'Pune',
    rating: 4.9, reviews: 176, priceFrom: 450, unit: 'plate', verified: true,
    image: require('@/assets/catalog/feat-catering.jpg'),
  },
  {
    id: 'blossom', cat: 'decoration', name: 'Blossom Decorators', city: 'Pune',
    rating: 4.7, reviews: 96, priceFrom: 35000, unit: 'event', verified: true,
    image: require('@/assets/catalog/feat-decor.jpg'),
  },
  {
    id: 'riverside-resort', cat: 'venues', name: 'Riverside Resort', city: 'Lonavala',
    rating: 4.9, reviews: 211, priceFrom: 150000, unit: 'day', verified: true,
    image: require('@/assets/catalog/hero.jpg'),
  },
  {
    id: 'candid-frames', cat: 'photography', name: 'Candid Frames Studio', city: 'Pune',
    rating: 4.8, reviews: 154, priceFrom: 45000, unit: 'event', verified: true,
    image: require('@/assets/catalog/cat-photography.jpg'),
  },
  {
    id: 'beatbox', cat: 'music', name: 'BeatBox DJ & Sound', city: 'Pune',
    rating: 4.6, reviews: 73, priceFrom: 25000, unit: 'event', verified: false,
    image: require('@/assets/catalog/cat-music.jpg'),
  },
];

/** ₹85,000 — Indian digit grouping, matching the prototype's vsFormatPrice. */
export function formatPrice(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

/** Badges derived from data, exactly as the prototype does it. */
export function badgesFor(v: Vendor): { key: string; icon: string; label: string }[] {
  const out: { key: string; icon: string; label: string }[] = [];
  if (v.verified) out.push({ key: 'verified', icon: '🏆', label: 'Verified' });
  if (v.rating >= 4.8) out.push({ key: 'top', icon: '⭐', label: 'Top Rated' });
  if (v.reviews >= 150) out.push({ key: 'booked', icon: '🔥', label: 'Most Booked' });
  return out.slice(0, 2);
}
