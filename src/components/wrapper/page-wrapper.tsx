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
}: {
  className?: String | "";
  children?: React.ReactNode;
  mainBoxClassName?: String | "";
  rightBox?: React.ReactNode;
  rightBoxClassName?: String | "";
  leftBox?: React.ReactNode;
  leftBoxClassName?: String | "";
}) {
  return (
    <div className={className + " w-full h-full flex justify-center "}>
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
