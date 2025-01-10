import React from "react";
import { ButtonSize, IButton } from "./button";
import { Button } from "@nextui-org/react";

function BasicButton(props: IButton) {
  let classNames = "";
  let iconSize = "";

  switch (props.buttonSize) {
    case ButtonSize.small:
      classNames = " h-8 rounded-lg px-2  text-xs ";
      iconSize = "size-4";
      break;

    case ButtonSize.medium:
      classNames = " h-10 rounded-md px-3 text-sm ";
      iconSize = "size-5";
      break;

    case ButtonSize.large:
      classNames = " h-12 rounded-lg px-4  text-base ";
      iconSize = "size-6";
      break;

    case ButtonSize.xlarge:
      classNames = " h-14 rounded-xl px-6 text-base ";
      iconSize = "size-6";
      break;

    default:
      classNames = " h-10 rounded-md px-3 text-base ";
      iconSize = "size-5";
      break;
  }

  return (
    <Button
      isLoading={props.loading}
      type={props.type}
      className={`
    ${props.className}
    ${classNames}
    !min-w-0
    font-custom font-bold shadow-none focus:shadow-none hover:shadow-none
    line-clamp-1 focus:ring-0 ring-0
     flex items-center justify-center flex-row
    `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.PreffixIcon != null ? (
        <div className="ml-1 ">
          <props.PreffixIcon {...{ className: ` ${iconSize}` }} />
        </div>
      ) : null}

      {props.children}

      {props.SuffixIcon != null ? (
        <div className="mr-1 ">
          <props.SuffixIcon {...{ className: ` ${iconSize}` }} />
        </div>
      ) : null}
    </Button>
  );
}

export default BasicButton;
