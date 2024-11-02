import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Providers from "@/providers";
import { GlobalWrapperScrollProvider } from "@/providers/GlobalWrapperScrollProvider";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
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
  const dicts = await getMessages(lng);
  const user = await currentUser();
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers lng={lng} dicts={dicts}>
          <GlobalWrapperScrollProvider>
            <Nav />
            <div className=" mx-auto ">{children}</div>
            <Footer />
          </GlobalWrapperScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
