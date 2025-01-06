"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FiX } from "react-icons/fi";
import BasicInput from "../inputs/basic-input";
import OutlinedButton from "../buttons/outlined-button";
import { countryList, CountryModel } from "@/common/constants/country-list";
import { useWindowSize } from "@/common/hooks/resize-window";

const Modal = dynamic(() => import("tw-elements-react").then((mod) => mod.TEModal), {
  ssr: false,
});

function CountryModal({
  isShow,
  onPressClose,
  onPressSubmit,
  onHide,
}: {
  isShow: boolean;
  onPressClose: () => void;
  onPressSubmit: (ct: CountryModel | null) => void;
  onHide: () => void;
}) {
  const [width, height] = useWindowSize();
  const [countryQuery, setCountryQuery] = useState<string | null>(null);
  const [currentCountryList, setCountryList] = useState<CountryModel[]>(countryList);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryQuery(event.target.value);
    if (event.target.value.trim()) {
      setCountryList((prev) =>
        prev.filter((e) =>
          e.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setCountryList(countryList);
    }
  };

  const _onHide = () => {
    setCountryQuery(null);
    setCountryList(countryList);

    onHide();
  };

  const getHeader = () => {
    return (
      <div className="w-full inline-flex flex-row items-center justify-between p-6 border-b-2">
        <button className="btn btn-sm btn-circle btn-ghost" onClick={onPressClose}>
          <FiX className="text-lg text-neutral-9-light dark:text-neutral-9-dark" />
        </button>
        <h2 className="font-custom font-bold">انتخاب کشور</h2>
        <div className="btn btn-sm btn-circle btn-ghost"></div>
      </div>
    );
  };

  const getSelectedCity = () => {
    return (
      <div className="w-full pt-4 px-6">
        <BasicInput
          placeholder="جستجو کشور"
          value={countryQuery ?? ""}
          className="text-start bg-neutral-2-light dark:bg-neutral-2-dark mt-4"
          onChange={handleChange}
        />
      </div>
    );
  };

  const getList = () => {
    return (
      <>
        {...currentCountryList.map((e, index) => (
          <div
            key={index}
            className="flex flex-row items-center border-base-300 border-b-[1px] py-6  text-xl font-medium"
            dir="ltr"
            onClick={(_) => {
              onPressSubmit(e);
              onPressClose();
            }}
          >
            <div className="flex flex-1">{e.name}</div>
            <div>{e.dialCode}</div>
          </div>
        ))}
      </>
    );
  };

  const getActions = () => {
    return (
      <div className="fixed bottom-0 bg-background-light w-full inline-flex flex-row p-6">
        <OutlinedButton className="flex flex-1" onClick={onPressClose}>
          انصراف
        </OutlinedButton>
      </div>
    );
  };

  return (
    <Modal
      className="z-[9999] bg-gray-500 bg-opacity-10 items-center justify-center flex"
      show={isShow}
      onHide={_onHide}
    >
      <div
        className={
          "w-full inline-flex flex-col p-0 overflow-y-hidden" +
          (width <= 640 ? " h-full bg-background-light " : " h-1/2 modal-box ")
        }
      >
        {getHeader()}
        {getSelectedCity()}
        <div className="divider custom-divider mx-6" />
        <div className="flex flex-1 w-full flex-col px-6 overflow-scroll no-scrollbar">
          {getList()}
          <span className="h-[100px] min-h-[100px] w-[100px] bg-background-light" />
        </div>
        {getActions()}
      </div>
    </Modal>
  );
}
export default CountryModal;
