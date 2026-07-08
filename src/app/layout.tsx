import type { Metadata } from "next";
import { Anton, DM_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { site, hours, reviews } from "@/lib/site";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const dancing = Dancing_Script({ variable: "--font-dancing", subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nunusbarber.co.za"),
  title: "Nunus Barber Shop — Premium Barbering in Krugersdorp",
  description:
    "Nunus Barber Shop in Krugersdorp North — old-school craft, modern finish. Skin fades, hot towel shaves & beard shaping by Hemza. 4.8★ from 25 Google reviews. Book on WhatsApp.",
  keywords: [
    "barber Krugersdorp",
    "barbershop Krugersdorp North",
    "skin fade",
    "hot towel shave",
    "beard trim",
    "Nunus Barber",
    "Hemza barber",
  ],
  openGraph: {
    type: "website",
    title: "Nunus Barber Shop — Premium Barbering in Krugersdorp",
    description: "Old-school craft. Modern finish. Book your cut with Hemza on WhatsApp.",
    url: "https://nunusbarber.co.za/",
    siteName: "Nunus Barber Shop",
    images: [{ url: "/images/cut-1.jpg", width: 1200, height: 630 }],
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nunus Barber Shop — Premium Barbering in Krugersdorp",
    description: "Old-school craft. Modern finish. Book your cut with Hemza on WhatsApp.",
    images: ["/images/cut-1.jpg"],
  },
};

function jsonLd() {
  const dayName: Record<number, string> = {
    0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday",
  };
  const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const opening = Object.entries(hours)
    .filter(([, v]) => v)
    .map(([d, v]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayName[Number(d)],
      opens: fmt(v![0]),
      closes: fmt(v![1]),
    }));

  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: site.name,
    image: "https://nunusbarber.co.za/images/cut-1.jpg",
    url: "https://nunusbarber.co.za/",
    telephone: site.phoneTel,
    priceRange: "R",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Heritage Square, Cecil Knight St, Krugersdorp North",
      addressLocality: "Krugersdorp",
      addressRegion: "Gauteng",
      postalCode: "1739",
      addressCountry: "ZA",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    hasMap: site.mapsQuery,
    openingHoursSpecification: opening,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(site.rating),
      reviewCount: String(site.reviewCount),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: r.text,
    })),
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable} ${dancing.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#0b0b0c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </head>
      <body className="grain min-h-full flex flex-col bg-ink text-ivory">{children}</body>
    </html>
  );
}
