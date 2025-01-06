import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type BasicInputProps = {
  title?: null | string;
  placeholder?: undefined | string;
  className?: null | string;
} & React.ComponentProps<"input"> & {
    register?: UseFormRegisterReturn<any>;
  };

const BasicInput: React.FC<BasicInputProps> = ({
  title,
  placeholder,
  className,
  children,
  register,
  ...rest
}) => {
  return (
    <div className="flex-col flex text-neutral-7-light dark:text-neutral-7-dark text-sm">
      {title}
      <input
        type="text"
        className={`text-neutral-10-light dark:text-neutral-10-dark p-2 border-[1px] rounded-md font-custom mt-2 text-lg
          border-neutral-3-light dark:border-neutral-3-dark 
            focus:outline-none focus:ring-0 outline-0 focus:outline-0 focus:border-primary-5-light dark:focus:border-primary-5-dark
          ${className}`}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
    </div>
  );
};

export default BasicInput;
