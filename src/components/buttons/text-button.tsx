import React from "react";
import { IButton } from "./button";
import BasicButton from "./basic-button";

function TextButton(props: IButton) {
  return (
    <BasicButton
      {...props}
      className={`
        outline-none focus:outline-none focus:border-none
        bg-transparent 
       ${
         props.disabled
           ? " text-neutral-7-light dark:text-neutral-7-dark"
           : props.textColor ?? " text-neutral-11-light dark:text-neutral-11-dark"
       }
       ${props.className}
      `}
    />
  );
}

export default TextButton;
