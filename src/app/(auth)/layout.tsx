export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={`bg-background-light dark:bg-background-dark h-dvh overflow-y-auto overflow-x-clip  w-full`}
    >
      {children}
    </section>
  );
}
