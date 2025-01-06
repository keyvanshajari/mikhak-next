import CentralContainer from "@/components/container/central-container";
import Image from "next/image";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={`bg-background-light dark:bg-background-dark h-dvh overflow-y-auto overflow-x-clip  w-full`}
    >
      <CentralContainer>
        <div className="md:border-2 p-8 rounded-2xl w-full max-w-[500px] ">
          <div className="w-full mt-4 flex flex-col items-center justify-center">
            <Image
              alt="logo-mikhak"
              src={"/mikhak-logo-primary.png"}
              height={80}
              width={212}
              style={{
                width: "auto",
                height: "80px",
              }}
            />
          </div>
          {children}
        </div>
      </CentralContainer>
    </section>
  );
}
