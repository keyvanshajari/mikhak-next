import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={`bg-background-light dark:bg-background-dark h-dvh overflow-y-auto overflow-x-clip  w-full`}
    >
      <Navbar />
      {children}
    </section>
  );
}
