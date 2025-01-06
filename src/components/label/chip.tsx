import React, { JSX } from "react";
import { FiX } from "react-icons/fi";

export default function Chip({
  title,
  icon,
  withIcon,
  onTap,
}: {
  title: string;
  icon?: JSX.Element;
  withIcon?: boolean;
  onTap: () => void;
}) {
  return (
    <div
      className="font-bold inline-flex 
  justify-center flex-row items-center
bg-primary-1-light bg-opacity-40 text-primary-7-light
  mr-2 px-4 py-2 rounded-full"
    >
      {withIcon && (
        <button
          onClick={onTap}
          className="ml-1 mt-0.5 text-primary-7-light aspect-square rounded-full p-1"
        >
          {icon || <FiX style={{ strokeWidth: "2.25px" }} />}
        </button>
      )}
      <p className=" text-[1rem] p-1">{title}</p>
    </div>
  );
}
