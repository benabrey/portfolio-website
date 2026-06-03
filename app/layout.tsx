import { Shrikhand, Righteous, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { type ReactNode } from "react";
import ScrollProgress from "./components/ScrollProgress";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

const righteous = Righteous({
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
  title: "wURLd Web Design",
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
        className={`${shrikhand.variable} ${righteous.variable} ${dmSans.variable}`}
      >
        <Nav />
        <ScrollProgress />
        {children}
        <Footer />
      </body>
    </html>
  );
}
