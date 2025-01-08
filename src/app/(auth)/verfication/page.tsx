import React from "react";
import VerficationForm from "./verfication-form";

const Page = async ({
  searchParams,
  ...rest
}: {
  searchParams?: Promise<{ mobile?: string | undefined; nationalCode: string | undefined }>;
}) => {
  const { mobile, nationalCode } = (await searchParams) || {};

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold font-custom text-2xl mt-6 mb-11">ورود به میخک</h1>
      <VerficationForm {...rest} {...{ mobile, nationalCode }} />
    </div>
  );
};

export default Page;
