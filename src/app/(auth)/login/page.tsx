"use client";
import React, { useEffect, useState } from "react";
import CentralContainer from "@/components/container/central-container";
import Image from "next/image";
import FillButton from "@/components/buttons/fill-button";
import BasicInput from "@/components/inputs/basic-input";
import { isValidIrNationalCode, PhoneSchemaError, phoneUtil } from "@/common/validator/validator";
import { useDispatch } from "react-redux";
import { fetchOtp } from "@/redux/features/auth-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { FETCHING_STATES } from "@/types/response-type";
import Routes from "@/common/constants/routes";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { countryList } from "@/common/constants/country-list";
import { APP_TYPE } from "@/common/constants/constants";
import RadioGroup from "@/components/radio-group";
import { getAppType, setAppType as setAppTypeStorage } from "@/common/utils/storage";
import OutlinedButton from "@/components/buttons/outlined-button";
import { Router } from "next/router";

const Page = () => {
  const router = useRouter();
  const region = countryList[0];

  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [appType, setAppType] = useState(APP_TYPE.moda);

  const onTapRegister = () => {
    router.push(Routes.registerPage);
  };

  useEffect(() => {
    setAppType(getAppType());
  }, []);

  useEffect(() => {
    setAppTypeStorage(appType);
  }, [appType]);

  useEffect(() => {
    switch (authState.getOtpState) {
      case FETCHING_STATES.READY:
        router.push(
          `${Routes.verficaionPage}?mobile=${phone}${
            appType == APP_TYPE.moda ? `&nationalCode=${nationalCode}` : ""
          }`
        );
        break;

      case FETCHING_STATES.FAILED:
        toast.error("خطا در دریافت کد تایید");
      default:
        break;
    }
  }, [authState.getOtpState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const phoneInput = formData.get("phone")!.toString();
      const number = phoneUtil.parse(phoneInput, region.code);

      const { error } = PhoneSchemaError.validate({ phone: number });
      if (error) {
        toast.error(error.details[0].message);
        return;
      }
      setPhone(phoneInput);

      if (appType === APP_TYPE.moda) {
        const nationalCodeInput = formData.get("nationalCode")!.toString();
        const isValid = isValidIrNationalCode(nationalCodeInput);
        if (!isValid) {
          toast.error("کد ملی را وارد کنید");
          return;
        }
        setNationalCode(nationalCodeInput);
        dispatch(fetchOtp({ mobile: phoneInput, nationalCode: nationalCodeInput, type: appType }));
      } else {
        dispatch(fetchOtp({ mobile: phoneInput, type: appType }));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold font-custom text-2xl mt-6 mb-11">ورود به میخک</h1>

      <form className="w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <div className="w-full md:w-96 flex-col flex ">
          <BasicInput
            key={"phone"}
            title={"شماره موبایل:"}
            type="tel"
            name="phone"
            placeholder="09xxxxxxxx"
            dir="ltr"
            className="text-center mb-4"
          />

          {appType === APP_TYPE.moda && (
            <BasicInput
              key={"nationalCode"}
              title={"کد ملی:"}
              name="nationalCode"
              type="tel"
              placeholder="1234567890"
              dir="ltr"
              className="text-center mb-4"
            />
          )}

          <RadioGroup<number>
            items={[
              {
                label: "ورود بیمار",
                value: 2,
              },
              {
                label: "ورود پزشک",
                value: 1,
              },
            ]}
            onChange={(value) => {
              setAppType(value);
            }}
            selectedValue={appType}
          />

          <div
            className={`w-full mt-10 flex flex-col
            `}
          >
            <FillButton
              type="submit"
              className={"w-full"}
              loading={authState.getOtpState == FETCHING_STATES.FETCHING}
            >
              ورود
            </FillButton>
            <OutlinedButton onClick={onTapRegister} className={"w-full mt-4"}>
              ثبت‌ نام
            </OutlinedButton>

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
        </div>
      </form>
    </div>
  );
};

export default Page;
