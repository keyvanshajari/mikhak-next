import Routes from "@/common/constants/routes";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold font-custom text-2xl mt-6 mb-11">ثبت نام در میخک</h1>
      <p className="text-caption text-neutral-9-light mt-4 text-center">
        ورود شما به معنای پذیرش
        <a className="mx-1 inline-block text-primary-4-light" href={Routes.termsPage}>
          شرایط میخک
        </a>
        و
        <a className="mx-1 inline-block text-primary-4-light" href={Routes.termsPage}>
          قوانین حریم‌خصوصی
        </a>
        است
      </p>
    </div>
  );
}
