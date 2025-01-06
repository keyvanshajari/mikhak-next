import React from "react";

export default function CentralContainer(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <main className=" h-dvh w-full inline-flex ">
      <div className="container overflow-y-auto m-auto self-center">
        <div className="flex justify-center items-center py-4 ">{props.children}</div>
      </div>
    </main>
  );
}
