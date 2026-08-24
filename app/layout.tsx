import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://themgicungco.vn"),
  title: "THÈM GÌ CŨNG CÓ | Bánh tráng theo cách THÈM",
  description: "Bánh tráng Việt Nam, đậm vị theo cách THÈM. Trứng lòng đào, sốt riêng đậm đà, tóp mỡ tươi giòn rụm và thực đơn ăn vặt phong phú.",
  keywords: [
    "bánh tráng",
    "bánh tráng cuốn",
    "bánh tráng trộn",
    "bánh tráng chấm",
    "bánh tráng thèm",
    "thèm gì cũng có",
    "trứng lòng đào",
    "ăn vặt Sài Gòn",
    "bánh tráng Tây Ninh",
  ],
  authors: [{ name: "THÈM GÌ CŨNG CÓ" }],
  creator: "THÈM GÌ CŨNG CÓ",
  publisher: "THÈM GÌ CŨNG CÓ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://themgicungco.vn",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://themgicungco.vn",
    siteName: "THÈM GÌ CŨNG CÓ",
    title: "THÈM GÌ CŨNG CÓ | Bánh tráng theo cách THÈM",
    description: "Bánh tráng Việt Nam, đậm vị theo cách THÈM. Đặt hàng ngay để thưởng thức bánh tráng cuốn trứng lòng đào, bánh tráng trộn và sốt me đậm đà.",
    images: [
      {
        url: "/them-hero-yellow.webp",
        width: 1200,
        height: 630,
        alt: "THÈM GÌ CŨNG CÓ - Bánh tráng theo cách THÈM",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THÈM GÌ CŨNG CÓ | Bánh tráng theo cách THÈM",
    description: "Bánh tráng Việt Nam, đậm vị theo cách THÈM. Trứng lòng đào, sốt riêng, tóp mỡ tươi.",
    images: ["/them-hero-yellow.webp"],
    creator: "@themgicungco",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFDE1F",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const directionContract = `<!-- THESIS: Sauce and egg-yolk orbit make the signature bánh tráng cuốn the homepage's appetite-first center, not a product card.\nOWN-WORLD: THÈM Yellow #FFDE1F is the primary brand surface. Dark Sauce and Rice-paper Cream are structural supporting colors; Chili Red is secondary.\nSTORY: Meet THÈM through one signature bite, then move to menu, ingredients and stores.\nFIRST VIEWPORT: Oversized Vietnamese display type on yellow; food enters from the right inside a red sauce orbit; Menu CTA leads.\nFORM: Dòng sốt / Comp 3, Món signature ở tâm.\nFINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->`;
  return (
    <html lang="vi">
      <head>
        <link
          rel="preload"
          as="image"
          href="/them-hero-yellow.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body>
        <div aria-hidden="true" className="direction-contract" dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
