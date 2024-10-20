import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Providers from "@/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "a1ex`s blog 学习",
  description: "Generated by a1ex`s blog 学习"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="wrapper h-screen w-screen overflow-y-scroll">
            <Nav />
            <div className="max-w-[1280px] mx-auto ">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
