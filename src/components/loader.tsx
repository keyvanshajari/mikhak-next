import React from "react";

export default function CustomLoader({ className }: { className?: string }) {
  return (
    <span
      className={`loading  loading-dots loading-md bg-onBackground-light dark:bg-onBackground-dark  ${className}}`}
    ></span>
  );
}
