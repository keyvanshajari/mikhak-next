import { scrollbarStyle } from "@/common/constants/constants";
import React from "react";

const sideBoxStyle = "overflow-y-auto hidden lg:block col-span-2 " + scrollbarStyle;

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
  let col = 6;
  if (rightBox) col += 2;
  if (leftBox) col += 2;

  const columnsStyle = `grid-cols-${col - 2} xl:grid-cols-${col}`;

  return (
    <div className={className + " w-full h-full"}>
      <div className="container mx-auto h-full overflow-hidden">
        <div className={"w-full h-full grid overflow-y-hidden gap-x-8 " + columnsStyle}>
          {rightBox && (
            <div className={sideBoxStyle + rightBoxClassName} dir="ltr">
              <div dir="rtl">{rightBox}</div>
            </div>
          )}

          <div
            className={
              mainBoxClassName +
              " flex flex-1 overflow-y-auto overflow-x-hidden col-span-full lg:col-span-4 xl:col-span-6" +
              scrollbarStyle
            }
            dir="ltr"
          >
            <div dir="rtl" className="w-full">
              {children}
            </div>
          </div>

          {leftBox && (
            <div className={sideBoxStyle + leftBoxClassName} dir="ltr">
              <div dir="rtl">{leftBox}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
