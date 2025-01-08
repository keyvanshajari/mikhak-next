"use client";
import Routes from "@/common/constants/routes";
import { replaceToFarsiNumber } from "@/common/helper/format-helper";
import FillButton from "@/components/buttons/fill-button";
import BasicInput from "@/components/inputs/basic-input";
import { BasicDropDown } from "@/components/inputs/drop-down";
import RadioGroup from "@/components/radio-group";
import Link from "next/link";
import { useState } from "react";
import { DatePicker } from "zaman";

interface IPerson {
  id: number;
  name: string;
}
const people: Array<IPerson> = [
  { id: 1, name: "کیوان شجری" },
  { id: 2, name: "علی رضا شجری" },
  { id: 3, name: "کتی" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export default function Page() {
  const [doctor, setDoctor] = useState(people[0]);
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-bold font-custom text-2xl mt-6 mb-11">ثبت نام در میخک (بیمار)</h1>

      <div className="w-full md:w-96 flex-col flex gap-y-4">
        <BasicInput
          key={"phone"}
          title={"شماره موبایل:*"}
          type="tel"
          name="phone"
          placeholder={replaceToFarsiNumber("09xxxxxxxx")}
          dir="ltr"
          className="text-center"
        />
        <BasicInput
          key={"nationalcode"}
          title="کد ملی:*"
          type="tel"
          name="nationalCode"
          placeholder={replaceToFarsiNumber("1234567890")}
          dir="ltr"
          className="text-center"
        />
        <BasicInput title="نام:*" />
        <BasicInput title="نام خانوادگی:*" />

        <div className="w-full md:w-96 ">
          <p className="mb-2 text-neutral-7-light dark:text-neutral-7-dark text-sm">تاریخ تولد:</p>
          <DatePicker
            round="x4"
            position="center"
            inputAttributes={{
              placeholder: "۱۳۷۵/۰۴/۰۶",
            }}
            onChange={(e) => {
              // field.onChange(e.value);
            }}
            inputClass={`w-full p-2 border-[1.5px] rounded-md text-start font-custom text-base  
                 border-neutral-3-light dark:border-neutral-3-dark focus:border-transparent
               outline-[1.5] outline-neutral-3-light focus:outline-primary-5-light dark:focus:outline-primary-5-dark`}
          />
        </div>
        {/* <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <DatePicker
              round="x4"
              position="center"
              inputAttributes={{
                placeholder: "۱۳۷۵/۰۴/۰۶",
              }}
              onChange={(e) => {
                field.onChange(e.value);
              }}
              inputClass={`p-2 border-2 rounded-md text-start font-custom mt-2 text-lg  
                 border-neutral-3-light dark:border-neutral-3-dark focus:border-transparent
               outline-2 focus:outline-primary-5-light dark:focus:outline-primary-5-dark`}
            />
          )}
        /> */}

        <div className="text-neutral-7-light text-sm">
          جنسیت:
          <RadioGroup
            items={[
              {
                label: "مرد",
                value: 1,
              },
              {
                label: "زن",
                value: 2,
              },
            ]}
            onChange={(e) => {}}
            selectedValue={1}
          />
        </div>

        <BasicDropDown<IPerson>
          items={people}
          selected={doctor}
          onSelect={setDoctor}
          title={"استان:"}
          renderItem={(item) => item?.name ?? ""}
        />

        <BasicDropDown<IPerson>
          items={people}
          selected={doctor}
          onSelect={setDoctor}
          title={"شهر:"}
          renderItem={(item) => item?.name ?? ""}
        />
        <FillButton className="mt-4">ثبت نام</FillButton>
        <p className="text-caption text-neutral-9-light text-center text-base">
          آیا ثبت نام کرده اید؟
          <Link
            className="mx-1 inline-block text-primary-4-light text-base underline"
            href={Routes.loginPage}
          >
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
