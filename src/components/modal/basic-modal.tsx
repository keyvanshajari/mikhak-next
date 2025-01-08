import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { FiX } from "react-icons/fi";

const Modal = dynamic(() => import("tw-elements-react").then((mod) => mod.TEModal), {
  ssr: false,
});

function BasicModal({
  isShow,
  onPressClose,
  onHide,
  children,
  title,
}: {
  isShow: boolean;
  onPressClose: () => void;
  onHide: () => void;
  title: string;
  children: ReactNode;
}) {
  const _onHide = () => {
    onHide();
  };

  const getHeader = () => {
    return (
      <div className="w-full inline-flex flex-row items-center justify-between p-4 border-b-2">
        <button className="btn btn-sm btn-circle btn-ghost" onClick={onPressClose}>
          <FiX className="text-lg text-neutral-9-light dark:text-neutral-9-dark" />
        </button>
        <h2 className="font-custom font-bold">{title}</h2>
        <div className="btn btn-sm btn-circle btn-ghost"></div>
      </div>
    );
  };

  return (
    <Modal
      className="z-[9999] bg-gray-500 bg-opacity-10 items-center justify-center flex"
      show={isShow}
      onHide={_onHide}
    >
      <div
        className={"w-full inline-flex flex-col p-0 overflow-y-hidden h-full bg-background-light "}
      >
        {getHeader()}
        <div className="flex flex-col py-6 px-4">{children}</div>
      </div>
    </Modal>
  );
}

export default BasicModal;
