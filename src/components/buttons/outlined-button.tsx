import React from "react";
import { IButton } from "./button";
import BasicButton from "./basic-button";

function OutlinedButton(props: IButton) {
  return (
    <BasicButton
      {...props}
      className={`
        ${props.className}
        bg-transparent
        ${props.disabled ? "  " : " text-neutral-11-light dark:text-neutral-11-dark "}
        border-neutral-4-light dark:border-neutral-4-dark
          border-[1.75px] `}
    />
  );
}

export default OutlinedButton;
