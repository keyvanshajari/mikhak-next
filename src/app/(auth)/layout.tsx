import Routes from "@/common/constants/routes";
import CentralContainer from "@/components/container/central-container";
import { CustomToastContainer } from "@/components/toast/custom-toast";
import { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="bg-primary">
      <body className={`overflow-clip no-scrollbar h-full w-full`}>
        <CustomToastContainer />
        <section
          className={`bg-primary dark:bg-background-dark h-full overflow-y-auto overflow-x-clip w-full px-4`}
        >
          <CentralContainer>
            <div className="w-full max-w-[500px]">
              <div className="border-2 bg-background-light p-8 rounded-2xl w-full max-w-[500px] ">
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
              <p className="text-caption text-neutral-4-light mt-4 text-center">
                ورود شما به معنای پذیرش
                <Link className="mx-1 inline-block font-medium text-white" href={Routes.termsPage}>
                  شرایط میخک
                </Link>
                و
                <Link className="mx-1 inline-block font-medium text-white" href={Routes.termsPage}>
                  قوانین حریم‌خصوصی
                </Link>
                است
              </p>
            </div>
          </CentralContainer>
        </section>
      </body>
    </html>
  );
}
