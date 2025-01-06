"use client";
import { VerticalDivier } from "../divider/basic-divider";
import TextButton from "../buttons/text-button";
import { ButtonSize } from "../buttons/button";
import { useEffect, useState } from "react";
import { BasicInputProps } from "./basic-input";
import { countryList, CountryModel } from "@/common/constants/country-list";
import CountryModal from "../modal/country-modal";

const InputWithCountry: React.FC<
  BasicInputProps & { onChangeRegion: (code: CountryModel) => void }
> = ({ title, placeholder, className, children, disabled, register, onChangeRegion, ...rest }) => {
  const [isOpenCountryModal, setIsOpenCountryModal] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryModel>(countryList[0]);

  useEffect(() => {
    onChangeRegion(countryList[0]);
  }, []);

  useEffect(() => {
    onChangeRegion(selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="w-full flex-col flex text-neutral-7-light dark:text-neutral-7-dark text-sm">
      {title}
      <div className="relative rounded-md dark:bg-surface-dark w-full mt-2 text-base">
        <input
          id="keyword"
          name="keyword"
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          {...register}
          {...rest}
          className="
              w-full p-3
             dark:bg-surface-dark 
               rounded-md text-base
               border-[1px] border-neutral-3-light dark:border-neutral-3-dark
               focus:outline-none focus:ring-0
               disabled:border-neutral-5-light
               outline-0 focus:outline-0 focus:border-primary-5-light dark:focus:border-primary-5-dark
              pl-24 text-onSurface-light dark:text-onSurface-dark  placeholder:text-gray-400  sm:leading-6"
        />

        <div className="absolute inset-y-0 left-2 flex items-center flex-row">
          <VerticalDivier className="bg-neutral-4-light dark:bg-neutral-4-dark  max-h-9" />
          <TextButton
            buttonSize={ButtonSize.medium}
            onClick={() => {
              if (!disabled) {
                setIsOpenCountryModal(true);
              }
            }}
          >
            <p dir="ltr" className="font-bold text-base">
              {selectedCountry == null ? countryList[0].dialCode : selectedCountry.dialCode}
            </p>
          </TextButton>
        </div>
      </div>
      <CountryModal
        isShow={isOpenCountryModal}
        onHide={() => {}}
        onPressClose={() => setIsOpenCountryModal(false)}
        onPressSubmit={(ct) => {
          if (ct) {
            setSelectedCountry(ct);
          }
        }}
      />
    </div>
  );
};

export default InputWithCountry;
