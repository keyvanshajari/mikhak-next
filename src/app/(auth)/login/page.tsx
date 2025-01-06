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

const pad = (n: number) => {
  return n < 10 ? "0" + n : n;
};

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const region = countryList[0];

  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [appType, setAppType] = useState(APP_TYPE.moda);

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
    <CentralContainer>
      <div className="md:border-2  p-8 rounded-2xl">
        <div className="flex flex-col items-center justify-center mb-11 my-4">
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
          <h1 className="font-bold font-custom text-۲xl mt-6">ورود به میخک</h1>
        </div>
        <form onSubmit={handleSubmit}>
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

              <p className="text-caption text-neutral-9-light mt-4 text-center">
                ورود شما به معنای پذیرش
                <a className="mx-1 inline-block text-primary-4-light" href="/page/terms/">
                  شرایط میخک
                </a>
                و
                <a className="mx-1 inline-block text-primary-4-light" href="/page/privacy/">
                  قوانین حریم‌خصوصی
                </a>
                است
              </p>
            </div>
          </div>
        </form>
      </div>
    </CentralContainer>
  );
};

export default Page;
