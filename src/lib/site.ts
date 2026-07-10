// =====================================================================
// Nunus Barber Shop — single source of truth for all business content.
// Edit values here; every component reads from this file.
// =====================================================================

export const site = {
  name: "Nunus Barber Shop",
  shortName: "Nunus Barber",
  tagline: "Old-school craft. Modern finish.",
  barber: "Hemza",
  phoneDisplay: "074 615 1005",
  phoneTel: "+27746151005",
  whatsapp: "https://wa.me/27746151005",
  whatsappNumber: "27746151005",
  rating: 4.8,
  reviewCount: 25,
  address: {
    line1: "Heritage Square, Cecil Knight St",
    line2: "Krugersdorp North, Krugersdorp, 1739",
    plusCode: "WQ8H+7W Krugersdorp North",
    // TODO: confirm exact coordinates (derived from the plus code)
    lat: -26.0906,
    lng: 27.7736,
  },
  mapsQuery: "https://www.google.com/maps?q=WQ8H%2B7W+Krugersdorp+North",
  mapsEmbed:
    "https://www.google.com/maps?q=WQ8H%2B7W+Krugersdorp+North&output=embed",
  // TODO: add real social links
  socials: {
    instagram: "#",
    facebook: "#",
    google: "https://www.google.com/maps?q=WQ8H%2B7W+Krugersdorp+North",
  },
} as const;

export const about = {
  paragraphs: [
    "Nunus Barber Shop is Krugersdorp's home of precise, unhurried grooming. Set inside Heritage Square, it's a warm room of exposed brick, reclaimed walnut and polished chrome — the kind of place where a haircut is a ritual, not a transaction.",
    "At the chair you'll find Hemza, a long-trusted barber whose steady hand has shaped generations of the same families. Kids who took their first cut here now bring their own.",
  ],
  statLabel: "years of trust",
  statValue: "5",
};

import type { ServiceIconKey } from "@/components/Icons";

export type Service = { name: string; blurb: string; icon: ServiceIconKey; price: string; feature?: boolean };

export const services: Service[] = [
  { name: "Haircut", blurb: "Classic scissor or clipper cut, styled and finished to your taste.", icon: "scissors", price: "R110" },
  { name: "Skin Fade", blurb: "Seamless blend down to the skin — sharp lines, flawless gradient.", icon: "fade", price: "R140" },
  { name: "Beard Trim & Shape", blurb: "Sculpted, lined and balanced to frame your face.", icon: "beard", price: "R70" },
  { name: "Hot Towel Shave", blurb: "Traditional straight-razor shave with hot towels and balm.", icon: "razor", price: "R130" },
  { name: "Cut + Beard Combo", blurb: "The full reset — haircut paired with a shaped, conditioned beard.", icon: "crown", price: "R190", feature: true },
  { name: "Kids Cut", blurb: "Patient, friendly cuts for the young gentlemen.", icon: "kid", price: "R90" },
];

export type Stat = { value: number; suffix?: string; label: string; feature?: boolean; decimals?: number };

export const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Years of service", feature: true },
  { value: 1000, suffix: "+", label: "Happy clients" },
  { value: 4.8, suffix: "★", label: "Google rating", decimals: 1 },
  { value: 25, label: "Five-star reviews" },
];

export type Review = { name: string; text: string };

export const reviews: Review[] = [
  { name: "Gerrit Olivier", text: "Helpful, friendly and skilled staff. The shop is well organised and always clean — I highly recommend it." },
  { name: "Lindie", text: "I've taken my son to Hemza since he was four — he's sixteen now. By far the best barber we've ever used." },
  { name: "Ryan Van Leyleyveld", text: "Flipping fantastic barber! After struggling to find someone good for months, I'm so glad I found this place." },
  { name: "Chris Venter", text: "Fresh cut — would definitely recommend!" },
];

// Gallery: real haircut photos only. Drop more into /public/images and add here.
export const gallery = [
  { src: "/images/cut-1.jpg", alt: "Curly top with a clean taper fade at Nunus Barber" },
  { src: "/images/cut-2.jpg", alt: "Textured curls with a blended low fade" },
];

// Opening hours keyed by JS day (0 = Sunday). [openMinutes, closeMinutes] or null.
export const hours: Record<number, [number, number] | null> = {
  1: [540, 1080], // Mon 09:00–18:00
  2: [540, 1080],
  3: [540, 1080],
  4: [540, 1080],
  5: [540, 1080],
  6: [480, 930], // Sat 08:00–15:30
  0: [540, 840], // Sun 09:00–14:00
};

export const hoursRows = [
  { day: 1, label: "Monday", time: "09:00 – 18:00" },
  { day: 2, label: "Tuesday", time: "09:00 – 18:00" },
  { day: 3, label: "Wednesday", time: "09:00 – 18:00" },
  { day: 4, label: "Thursday", time: "09:00 – 18:00" },
  { day: 5, label: "Friday", time: "09:00 – 18:00" },
  { day: 6, label: "Saturday", time: "08:00 – 15:30" },
  { day: 0, label: "Sunday", time: "09:00 – 14:00" },
];
