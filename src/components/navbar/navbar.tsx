"use client";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import Routes from "@/common/constants/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextButton from "../buttons/text-button";
import CustomLoader from "../loader";
import { ButtonSize } from "../buttons/button";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav
      className={
        "fixed top-0 h-[--appbar-height] max-h-[--appbar-height] w-full z-50 bg-primary dark:bg-background-dark flex justify-center border-b-neutral-3-light border-b px-4  md:px-2"
      }
    >
      <div className="container flex flex-row h-full py-2 md:py-2 items-center justify-between overflow-hidden">
        <Link href={Routes.rootPage} passHref className={`ml-4`}>
          <Image
            alt="logo-mikhak"
            src={"/mikhak-logo-white.png"}
            height={80}
            width={80}
            className="w-auto h-[40px] md:h-[40px]"
          />
        </Link>

        <div className={"flex flex-row"}>
          {/* {session.status == "authenticated" ? ( */}
          <TextButton
            buttonSize={ButtonSize.xlarge}
            className="text-white !p-0"
            onClick={() => {
              router.push(Routes.profile);
            }}
          >
            <FiUser className="size-7" />
          </TextButton>
          {/* ) : session.status == "loading" ? ( */}
          {/* <CustomLoader className={" mx-8 "} /> */}
          {/* ) : ( */}
          <></>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
