/* =====================================================================
   Vivah Spot — mock data + shared render helpers (UI prototype only)
   No backend / database. Pages set window.IMG_BASE before rendering:
     "" for root-level pages, "../" for pages one folder deep.
   ===================================================================== */

const CATEGORIES = [
  { slug: "venues",      name: "Lawns & Venues",   img: "cat-venues.jpg",      color: "var(--c-green)" },
  { slug: "catering",    name: "Catering",          img: "cat-catering.jpg",    color: "var(--c-orange)" },
  { slug: "decoration",  name: "Decoration",        img: "cat-decoration.jpg",  color: "var(--c-pink)" },
  { slug: "photography", name: "Photography",       img: "cat-photography.jpg", color: "var(--c-blue)" },
  { slug: "makeup",      name: "Makeup & Mehndi",   img: "cat-makeup.jpg",      color: "var(--c-red)" },
  { slug: "music",       name: "DJ & Music",        img: "cat-music.jpg",       color: "var(--c-purple)" },
];

const VENDORS = [
  // ---- Venues ----
  {
    id: "green-meadows", cat: "venues", name: "Green Meadows Lawn", city: "Kothrud, Pune",
    rating: 4.8, reviews: 128, priceFrom: 85000, unit: "day", verified: true,
    img: "feat-venue.jpg", gallery: ["feat-venue.jpg", "cat-venues.jpg", "hero.jpg"],
    about: "A sprawling open-air lawn with lush gardens, ample parking and in-house lighting — perfect for grand wedding ceremonies and receptions of up to 800 guests.",
    amenities: ["Up to 800 guests", "Valet parking", "In-house catering", "Power backup", "Bridal room", "DJ allowed"],
    packages: [
      { name: "Day Booking", price: 85000, features: ["10 AM – 5 PM", "Up to 500 guests", "Basic lighting"] },
      { name: "Evening Booking", price: 110000, features: ["6 PM – 11 PM", "Up to 800 guests", "Premium lighting"] },
      { name: "Full Day", price: 175000, features: ["10 AM – 11 PM", "Up to 800 guests", "Dedicated manager"] },
    ],
  },
  {
    id: "royal-orchid", cat: "venues", name: "Royal Orchid Banquet", city: "Baner, Pune",
    rating: 4.6, reviews: 94, priceFrom: 65000, unit: "day", verified: true,
    img: "cat-venues.jpg", gallery: ["cat-venues.jpg", "feat-venue.jpg", "hero.jpg"],
    about: "An elegant air-conditioned indoor banquet hall with modern interiors, ideal for intimate weddings, engagements and sangeet nights.",
    amenities: ["Up to 400 guests", "Air conditioned", "Stage & green room", "Parking", "Power backup"],
    packages: [
      { name: "Half Day", price: 65000, features: ["5 hours", "Up to 250 guests", "Standard décor"] },
      { name: "Full Day", price: 120000, features: ["12 hours", "Up to 400 guests", "Premium décor"] },
    ],
  },
  {
    id: "riverside-resort", cat: "venues", name: "Riverside Resort", city: "Lonavala",
    rating: 4.9, reviews: 211, priceFrom: 150000, unit: "day", verified: true,
    img: "hero.jpg", gallery: ["hero.jpg", "feat-venue.jpg", "cat-venues.jpg"],
    about: "A destination wedding resort by the river with stay, multiple ceremony venues and full event management for an unforgettable celebration.",
    amenities: ["Up to 600 guests", "On-site stay", "Multiple venues", "Pool", "Catering", "Event manager"],
    packages: [
      { name: "Wedding Day", price: 150000, features: ["Full day", "2 venues", "Up to 600 guests"] },
      { name: "2-Day Package", price: 275000, features: ["Mehndi + Wedding", "Stay for 50", "All venues"] },
    ],
  },

  // ---- Catering ----
  {
    id: "annapurna", cat: "catering", name: "Annapurna Caterers", city: "Pune",
    rating: 4.9, reviews: 176, priceFrom: 450, unit: "plate", verified: true,
    img: "feat-catering.jpg", gallery: ["feat-catering.jpg", "cat-catering.jpg"],
    about: "Award-winning multi-cuisine caterers serving authentic Maharashtrian, North Indian and live counters with pure-veg and non-veg menus.",
    amenities: ["Veg & Non-veg", "Live counters", "Custom menus", "Serving staff", "Crockery included"],
    packages: [
      { name: "Silver Veg", price: 450, features: ["3 starters", "8 main dishes", "2 desserts"] },
      { name: "Gold Veg", price: 650, features: ["5 starters", "12 main dishes", "Live chaat counter"] },
      { name: "Platinum", price: 950, features: ["Veg + Non-veg", "Live counters", "Premium desserts"] },
    ],
  },
  {
    id: "spice-route", cat: "catering", name: "Spice Route Catering", city: "Pune",
    rating: 4.5, reviews: 88, priceFrom: 380, unit: "plate", verified: false,
    img: "cat-catering.jpg", gallery: ["cat-catering.jpg", "feat-catering.jpg"],
    about: "Budget-friendly caterers specialising in North Indian and Chinese cuisines for weddings and corporate events.",
    amenities: ["Veg & Non-veg", "Custom menus", "Serving staff"],
    packages: [
      { name: "Basic", price: 380, features: ["2 starters", "6 main dishes", "1 dessert"] },
      { name: "Deluxe", price: 560, features: ["4 starters", "10 main dishes", "2 desserts"] },
    ],
  },
  {
    id: "saffron-kitchen", cat: "catering", name: "Saffron Kitchen", city: "PCMC, Pune",
    rating: 4.7, reviews: 142, priceFrom: 520, unit: "plate", verified: true,
    img: "feat-catering.jpg", gallery: ["feat-catering.jpg", "cat-catering.jpg"],
    about: "Premium pure-veg caterers known for traditional thalis, regional specialities and impeccable presentation.",
    amenities: ["Pure veg", "Regional menus", "Live counters", "Crockery included", "Serving staff"],
    packages: [
      { name: "Traditional Thali", price: 520, features: ["Regional thali", "3 desserts", "Welcome drink"] },
      { name: "Royal Feast", price: 780, features: ["Multi-cuisine", "Live counters", "Dessert bar"] },
    ],
  },

  // ---- Decoration ----
  {
    id: "blossom", cat: "decoration", name: "Blossom Decorators", city: "Pune",
    rating: 4.7, reviews: 103, priceFrom: 30000, unit: "event", verified: true,
    img: "feat-decor.jpg", gallery: ["feat-decor.jpg", "cat-decoration.jpg"],
    about: "Floral and theme décor specialists creating stunning stages, mandaps and entrances tailored to your wedding theme.",
    amenities: ["Floral & theme décor", "Stage & mandap", "Entrance décor", "Lighting", "Custom themes"],
    packages: [
      { name: "Stage Décor", price: 30000, features: ["Themed stage", "Fresh flowers", "Backdrop"] },
      { name: "Full Venue", price: 85000, features: ["Stage + mandap", "Entrance", "Table & lighting"] },
    ],
  },
  {
    id: "petal-story", cat: "decoration", name: "Petal Story Events", city: "Wakad, Pune",
    rating: 4.8, reviews: 67, priceFrom: 45000, unit: "event", verified: true,
    img: "cat-decoration.jpg", gallery: ["cat-decoration.jpg", "feat-decor.jpg"],
    about: "Luxury wedding décor with imported flowers, bespoke installations and complete venue transformation.",
    amenities: ["Luxury décor", "Imported flowers", "Custom installations", "Lighting", "Drone-ready setups"],
    packages: [
      { name: "Signature", price: 45000, features: ["Designer stage", "Premium flowers", "Mood lighting"] },
      { name: "Grand", price: 130000, features: ["Full transformation", "Imported flowers", "Custom props"] },
    ],
  },

  // ---- Photography ----
  {
    id: "candid-frames", cat: "photography", name: "Candid Frames Studio", city: "Pune",
    rating: 4.9, reviews: 189, priceFrom: 60000, unit: "event", verified: true,
    img: "cat-photography.jpg", gallery: ["cat-photography.jpg", "hero.jpg"],
    about: "Storytelling wedding photography & cinematography capturing candid moments, with same-day teasers and premium albums.",
    amenities: ["Candid photography", "Cinematography", "Drone", "Same-day teaser", "Premium album"],
    packages: [
      { name: "Classic", price: 60000, features: ["1 photographer", "1 cinematographer", "300 edited photos"] },
      { name: "Premium", price: 110000, features: ["2 photographers", "Drone", "Teaser + film + album"] },
    ],
  },
  {
    id: "lens-tales", cat: "photography", name: "Lens & Tales", city: "Hadapsar, Pune",
    rating: 4.6, reviews: 74, priceFrom: 45000, unit: "event", verified: false,
    img: "cat-photography.jpg", gallery: ["cat-photography.jpg", "hero.jpg"],
    about: "Affordable yet creative wedding photography for couples who want beautiful memories on a budget.",
    amenities: ["Candid photography", "Traditional coverage", "Edited photos", "Album"],
    packages: [
      { name: "Essential", price: 45000, features: ["1 photographer", "250 edited photos", "Album"] },
      { name: "Plus", price: 75000, features: ["2 photographers", "Highlight film", "Album"] },
    ],
  },

  // ---- Makeup & Mehndi ----
  {
    id: "glam-by-aisha", cat: "makeup", name: "Glam by Aisha", city: "Pune",
    rating: 4.9, reviews: 156, priceFrom: 15000, unit: "booking", verified: true,
    img: "cat-makeup.jpg", gallery: ["cat-makeup.jpg"],
    about: "Celebrity bridal makeup artist specialising in HD and airbrush looks, with trials and on-location services.",
    amenities: ["HD & airbrush", "Bridal trials", "On-location", "Premium products", "Hair styling"],
    packages: [
      { name: "Bridal HD", price: 15000, features: ["Bridal makeup", "Hair styling", "Draping"] },
      { name: "Bridal + Trial", price: 22000, features: ["Trial session", "Wedding day", "Touch-up kit"] },
    ],
  },
  {
    id: "henna-art", cat: "makeup", name: "Henna Art by Meera", city: "Pune",
    rating: 4.8, reviews: 98, priceFrom: 6000, unit: "booking", verified: true,
    img: "cat-makeup.jpg", gallery: ["cat-makeup.jpg"],
    about: "Intricate bridal mehndi designs — Rajasthani, Arabic and contemporary — with natural, dark-staining henna.",
    amenities: ["Bridal mehndi", "Natural henna", "Family packages", "On-location"],
    packages: [
      { name: "Bridal Mehndi", price: 6000, features: ["Full hands & feet", "Intricate design", "Touch-up"] },
      { name: "Bridal + Family", price: 12000, features: ["Bride + 5 guests", "Custom designs"] },
    ],
  },

  // ---- DJ & Music ----
  {
    id: "beatbox", cat: "music", name: "BeatBox DJ & Sound", city: "Pune",
    rating: 4.7, reviews: 121, priceFrom: 25000, unit: "event", verified: true,
    img: "cat-music.jpg", gallery: ["cat-music.jpg"],
    about: "High-energy wedding DJs with professional sound, lighting and live dhol for sangeet and baraat.",
    amenities: ["Professional DJ", "Sound system", "Lighting", "Live dhol", "MC available"],
    packages: [
      { name: "Sangeet Night", price: 25000, features: ["DJ + sound", "Dance floor lighting", "4 hours"] },
      { name: "Full Wedding", price: 55000, features: ["Baraat + sangeet + reception", "Live dhol", "MC"] },
    ],
  },
  {
    id: "dhol-nation", cat: "music", name: "Dhol Nation", city: "PCMC, Pune",
    rating: 4.6, reviews: 59, priceFrom: 12000, unit: "event", verified: false,
    img: "cat-music.jpg", gallery: ["cat-music.jpg"],
    about: "Traditional dhol players and live percussion to set the rhythm for your baraat and celebrations.",
    amenities: ["Live dhol", "Percussion troupe", "Baraat specialists"],
    packages: [
      { name: "Baraat Dhol", price: 12000, features: ["2 dhol players", "2 hours", "Traditional attire"] },
      { name: "Troupe", price: 28000, features: ["4 players", "Full event", "Custom beats"] },
    ],
  },
];

/* ---------------- helpers ---------------- */
function vsBase() { return window.IMG_BASE || ""; }
function vsParam(name) { return new URLSearchParams(location.search).get(name); }
function vsCategory(slug) { return CATEGORIES.find(c => c.slug === slug); }
function vsVendor(id) { return VENDORS.find(v => v.id === id); }
function vsVendorsByCat(slug) { return VENDORS.filter(v => v.cat === slug); }
function vsFormatPrice(n) { return "₹" + n.toLocaleString("en-IN"); }

/* Returns the markup for one featured-style vendor card. */
function vsVendorCard(v) {
  const b = vsBase();
  const cat = vsCategory(v.cat);
  return `
    <a class="vcard" href="${b}vendor.html?id=${v.id}">
      <div class="vcard-media">
        <img src="${b}images/${v.img}" alt="${v.name}" loading="lazy" />
        <span class="vcard-tag">${cat ? cat.name : ""}</span>
        <button class="vcard-fav" type="button" aria-label="Save to favourites"
                data-fav="${v.id}" onclick="vsToggleFav(event, '${v.id}')">
          <svg viewBox="0 0 24 24" class="ico"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"/></svg>
        </button>
        <span class="rating">★ ${v.rating}</span>
      </div>
      <div class="vcard-body">
        <h3>${v.name}</h3>
        <p class="vcard-meta">
          <svg viewBox="0 0 24 24" class="ico"><path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          ${v.city}
        </p>
        <div class="vcard-foot">
          <span class="vcard-price">${vsFormatPrice(v.priceFrom)} <small>/ ${v.unit}</small></span>
          <span class="vcard-btn">View</span>
        </div>
      </div>
    </a>`;
}

/* ---- favourites (persisted in localStorage, no backend) ---- */
function vsGetFavs() {
  try { return JSON.parse(localStorage.getItem("vs_favs") || "[]"); }
  catch { return []; }
}
function vsSetFavs(list) { localStorage.setItem("vs_favs", JSON.stringify(list)); }
function vsIsFav(id) { return vsGetFavs().includes(id); }
function vsToggleFav(ev, id) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  const favs = vsGetFavs();
  const i = favs.indexOf(id);
  if (i >= 0) favs.splice(i, 1); else favs.push(id);
  vsSetFavs(favs);
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => b.classList.toggle("active", vsIsFav(id)));
  return false;
}
/* Sync heart states on load */
function vsSyncFavs() {
  document.querySelectorAll("[data-fav]").forEach(b => {
    b.classList.toggle("active", vsIsFav(b.getAttribute("data-fav")));
  });
}
