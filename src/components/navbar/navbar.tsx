import Image from "next/image";
import Link from "next/link";
import Routes from "@/common/constants/routes";
import NavProfileMenu from "../menu/profile-menu";
import { APP_TYPE } from "@/common/constants/constants";
import { APPTYPE_COOKIE_NAME } from "@/common/utils/cookie-manager";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookie = await cookies();
  const appType = (await cookie.get(APPTYPE_COOKIE_NAME)?.value) ?? APP_TYPE.moda;
  return (
    <nav
      className={
        "fixed top-0 shadow-sm h-[--appbar-height] max-h-[--appbar-height] w-full z-50 bg-background-light dark:bg-background-dark flex justify-center border-b-neutral-3-light border-b px-4  md:px-2"
      }
    >
      <div className="container  overflow-visible flex flex-row h-full py-2 md:py-2 items-center justify-between overflow-x-clip">
        <div className="flex flex-row items-center">
          <Link href={Routes.rootPage} passHref className={`ml-4`}>
            <Image
              alt="logo-mikhak"
              src={"/mikhak-logo-primary.png"}
              height={80}
              width={80}
              className="w-auto h-[40px] md:h-[40px]"
            />
          </Link>
          <h3 className="hidden md:block text-xl font-medium">دستیار آنلاین دندان پزشکی میخک</h3>
          <h3 className="md:hidden text-[1.15rem] font-medium">میخک</h3>
          {appType == APP_TYPE.oda && <p className="text-sm px-1 text-neutral-10-light">(پزشک)</p>}
        </div>

        <NavProfileMenu />
      </div>
    </nav>
  );
}
