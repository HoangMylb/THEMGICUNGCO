import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THÈM GÌ CŨNG CÓ | Bánh tráng theo cách THÈM",
  description: "Bánh tráng Việt Nam, đậm vị theo cách THÈM.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const directionContract = `<!-- THESIS: Sauce and egg-yolk orbit make the signature bánh tráng cuốn the homepage's appetite-first center, not a product card.\nOWN-WORLD: THÈM Yellow #FFDE1F is the primary brand surface. Dark Sauce and Rice-paper Cream are structural supporting colors; Chili Red is secondary.\nSTORY: Meet THÈM through one signature bite, then move to menu, ingredients and stores.\nFIRST VIEWPORT: Oversized Vietnamese display type on yellow; food enters from the right inside a red sauce orbit; Menu CTA leads.\nFORM: Dòng sốt / Comp 3, Món signature ở tâm.\nFINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->`;
  return (
    <html lang="vi">
      <body>
        <div aria-hidden="true" className="direction-contract" dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
