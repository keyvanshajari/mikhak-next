import { scrollbarStyle } from "@/common/constants/constants";
import React from "react";

const sideBoxStyle = "overflow-y-auto hidden lg:block " + scrollbarStyle;

export default function PageWrapper({
  className,
  children,
  mainBoxClassName,
  rightBox,
  rightBoxClassName,
  leftBox,
  leftBoxClassName,
  pageTitle,
}: {
  className?: string | "";
  children?: React.ReactNode;
  mainBoxClassName?: string | "";
  rightBox?: React.ReactNode;
  rightBoxClassName?: string | "";
  leftBox?: React.ReactNode;
  leftBoxClassName?: string | "";
  pageTitle?: string;
}) {
  return (
    <div className={className + " w-full h-full flex flex-col items-center pt-[--appbar-height]"}>
      {pageTitle && (
        <div className="w-full bg-primary-6-light h-20 text-white flex justify-center items-center">
          <div className="container h-20 text-2xl font-bold flex items-center">{pageTitle}</div>
        </div>
      )}
      <div className="container">
        <div className=" w-full flex flex-row h-full">
          {rightBox && (
            <div className={sideBoxStyle + rightBoxClassName + " ml-4"} dir="ltr">
              <div dir="rtl">{rightBox}</div>
            </div>
          )}
          <div
            className={
              mainBoxClassName + " flex flex-1 h-full overflow-x-hidden  " + scrollbarStyle
            }
            dir="ltr"
          >
            <div dir="rtl" className="w-full">
              {children}
            </div>
          </div>
          {leftBox && (
            <div className={sideBoxStyle + leftBoxClassName + " ml-4"} dir="ltr">
              <div dir="rtl">{leftBox}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
