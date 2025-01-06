"use client";
import React, { useEffect, useState } from "react";
import CentralContainer from "@/components/container/central-container";
import Image from "next/image";
import FillButton from "@/components/buttons/fill-button";
import BasicInput from "@/components/inputs/basic-input";
import { PhoneAndOtpSchemaError, phoneUtil } from "@/common/validator/validator";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { FETCHING_STATES } from "@/types/response-type";
import Routes from "@/common/constants/routes";
import { toast } from "react-toastify";
import TextButton from "@/components/buttons/text-button";
import { ButtonSize } from "@/components/buttons/button";
import { useRouter, useSearchParams } from "next/navigation";
import { countryList } from "@/common/constants/country-list";
import { APP_TYPE } from "@/common/constants/constants";
import { getAppType } from "@/common/utils/storage";
import { verifyOtp } from "@/redux/features/auth-slice";

const pad = (n: number) => {
  return n < 10 ? "0" + n : n;
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");
  const nationalCode = searchParams.get("nationalCode");
  const [appType, setAppType] = useState(APP_TYPE.moda);

  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const _appType = getAppType();
    setAppType(_appType);
  }, []);

  useEffect(() => {
    switch (authState.verifyOtpState) {
      case FETCHING_STATES.READY:
        router.push(Routes.rootPage);
        break;

      case FETCHING_STATES.FAILED:
        toast.error("کد وارد شده معتبر نمی‌باشد");
      default:
        break;
    }
  }, [authState.verifyOtpState]);

  const changePhone = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.replace(Routes.loginPage);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!mobile || (appType == APP_TYPE.moda && (!nationalCode || !mobile))) {
        toast.error("خطا در ورود لطفا دوباره کد را دریافت کنید");
        router.replace(Routes.loginPage);
        return;
      }

      const formData = new FormData(event.currentTarget);
      const otp = formData.get("otp")!.toString();
      const _phone = phoneUtil.parse(mobile, countryList[0].code);
      const { error } = PhoneAndOtpSchemaError.validate({ phone: _phone, otp });
      if (error) {
        toast.error(error.details[0].message);
        return;
      }

      dispatch(
        verifyOtp({
          mobile,
          type: appType,
          otpCode: otp,
          ...(nationalCode && { nationalCode }),
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <CentralContainer>
      <div className="md:border-2 p-8 rounded-2xl w-full max-w-[500px] ">
        <div className="w-full mb-11 my-4 flex flex-col items-center justify-center">
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
          <h1 className="font-bold font-custom text-2xl mt-6">ورود به میخک</h1>
        </div>
        <form className="w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <div className="w-full md:w-96 flex-col flex ">
            <BasicInput
              key={"phone"}
              title={"شماره موبایل:"}
              type="tel"
              name="phone"
              placeholder="09xxxxxxxx"
              disabled={true}
              dir="ltr"
              value={mobile?.toString()}
              className="text-center mb-4"
            />

            {appType === APP_TYPE.moda && (
              <BasicInput
                key={"nationalCode"}
                title={"کد ملی:"}
                name="nationalCode"
                type="tel"
                placeholder="1234567890"
                value={nationalCode?.toString()}
                disabled={true}
                dir="ltr"
                className="text-center"
              />
            )}

            <div className="w-full flex justify-end">
              <TextButton buttonSize={ButtonSize.small} onClick={changePhone}>
                ویرایش شماره
              </TextButton>
            </div>

            <BasicInput
              title={"کد تایید:"}
              name="otp"
              maxLength={6}
              placeholder="_ _ _ _"
              dir="ltr"
              className="text-center mt-2"
            />

            <div className={`w-full mt-10 flex flex-col`}>
              <FillButton
                type="submit"
                className={"w-full"}
                loading={authState.verifyOtpState == FETCHING_STATES.FETCHING}
              >
                تایید
              </FillButton>
            </div>
          </div>
        </form>
      </div>
    </CentralContainer>
  );
};

export default Page;
