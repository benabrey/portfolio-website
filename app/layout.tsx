import { Monoton, Fascinate_Inline, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { type ReactNode } from "react";
import ScrollProgress from "./components/ScrollProgress";
import AlbumCover from "./AlbumCover";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

const fascinateInline = Fascinate_Inline({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Websites By Ben",
  description: "Custom coded websites, no cookie cutter services used",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body
        className={`${monoton.variable} ${fascinateInline.variable} ${dmSans.variable}`}
      >
        <Nav />
        <ScrollProgress />
        <AlbumCover />
        {children}
        <Footer />
      </body>
    </html>
  );
}
