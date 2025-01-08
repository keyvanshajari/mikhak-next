import type { Metadata, Viewport } from "next";
import "./globals.css";
import Head from "next/head";
import { CustomToastContainer } from "@/components/toast/custom-toast";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "دستیار میخک - Mikhak Assistant",
  description: "دستیار دندان پزشکی میخک",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
