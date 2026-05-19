import {
  Syne,
  Inter,
  Space_Grotesk,
  Bungee_Shade,
  Tourney,
  Squada_One,
  Jersey_15,
  Josefin_Sans,
} from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import { type ReactNode } from "react";
import ScrollProgress from "./components/ScrollProgress";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font",
  weight: ["300", "400", "500", "600", "700"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500"],
});

const bungeeShade = Bungee_Shade({
  subsets: ["latin"],
  variable: "--font-bungee-shade",
  weight: "400",
});

const tourney = Tourney({
  subsets: ["latin"],
  variable: "--font-tourney",
  weight: ["700", "800"],
});

const squadaOne = Squada_One({
  subsets: ["latin"],
  variable: "--font-squada-one",
  weight: "400",
});

const jersey15 = Jersey_15({
  subsets: ["latin"],
  variable: "--font-jersey-15",
  weight: "400",
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
        className={`${syne.variable} ${josefinSans.variable} ${spaceGrotesk.variable} ${bungeeShade.variable} ${tourney.variable} ${squadaOne.variable} ${jersey15.variable}`}
      >
        <Cursor />
        <Nav />
        <ScrollProgress />
        {children}
        <Footer />
      </body>
    </html>
  );
}
