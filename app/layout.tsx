import { Syne, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import {type ReactNode} from 'react'
import ScrollProgress from './components/ScrollProgress'
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Websites By Ben",
  description: "Custom coded websites, no cookie cutter services used",
};

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} ${spaceGrotesk.variable}`}
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
