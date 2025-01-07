import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MailForm from "./components/Mail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dynamic Blog Website",
  description: "CMS Dynamic Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed z-20 w-full top-0">
          <Navbar />
        </div>
        {children}
        <div className="text-center text-black mt-16 bg-fixed bg-mentalhealthbanner bg-cover">
          <MailForm />
        </div>
        <Footer />
      </body>
    </html>
  );
}
