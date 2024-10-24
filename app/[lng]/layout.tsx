import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Providers from "@/providers";
import type { Metadata } from "next";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "a1ex`s blog 技术学习分享",
  description: "Generated by a1ex`s blog 技术学习分享"
};

export default async function RootLayout({
  children,
  params: { lng }
}: Readonly<{
  children: React.ReactNode;
}>) {
  unstable_setRequestLocale(lng);
  const dicts = await getMessages(lng);
  console.log("🚀 ~ dicts:", dicts);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers lng={lng} dicts={dicts}>
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
