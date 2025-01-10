import Navbar from "@/components/navbar/navbar";
import { CustomToastContainer } from "@/components/toast/custom-toast";
import { CustomUIProviders } from "@/components/wrapper/next-ui-providers";
import { Viewport } from "next";
import Head from "next/head";

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
  return (
    <html lang="fa">
      <Head>
        <meta charSet="UTF-8" />
        <meta property="og:title" content="Mikhak App" />
      </Head>
      <body className={`overflow-y-hidden overflow-x-clip no-scrollbar !h-full w-full`}>
        <CustomUIProviders>
          <section
            className={`bg-background-light dark:bg-background-dark h-dvh overflow-y-auto overflow-x-clip  w-full`}
          >
            <CustomToastContainer />
            <Navbar />
            {children}
          </section>
        </CustomUIProviders>
      </body>
    </html>
  );
}
