import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import { CustomToastContainer } from "@/components/toast/custom-toast";
import Navbar from "@/components/navbar/navbar";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "دستیار میخک - Mikhak Assistant",
  description: "دستیار دندان پزشکی میخک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="UTF-8" />
        <meta property="og:title" content="Rentino App" />
      </Head>
      <body
        className={`bg-background-light dark:bg-background-dark overflow-y-hidden overflow-x-clip no-scrollbar w-full`}
      >
        <StoreProvider>
          <CustomToastContainer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
