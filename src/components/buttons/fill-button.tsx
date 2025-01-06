import React from "react";
import { IButton } from "./button";
import BasicButton from "./basic-button";

function FillButton(props: IButton) {
  return (
    <BasicButton
      {...props}
      className={`
      ${props.className}
      outline-none border-none
      bg-primary hover:bg-primary-7-light   dark:bg-primary dark:hover:bg-primary-7-dark        
      text-white `}
    />
  );
}

export default FillButton;
