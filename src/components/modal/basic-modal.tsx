"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { FiX } from "react-icons/fi";

export interface IRefBasicModal {
  openModal: () => void;
  closeModal: () => void;
}

export interface IbasicModal {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | undefined;
  title: string;
  onHide?: () => void;
}

const BasicModal = forwardRef<IRefBasicModal, IbasicModal>(({ children, size, title }, ref) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openModal: () => {
      onOpen();
    },
    closeModal: () => {
      onClose();
    },
  }));

  const getHeader = ({ onPressClose }: { onPressClose: () => void }) => {
    return (
      <ModalHeader className="w-full inline-flex flex-row items-center justify-between p-6 border-b-2 h-[--appbar-height]">
        <button className="btn btn-sm btn-circle btn-ghost" onClick={onPressClose}>
          <FiX className="text-lg text-neutral-9-light dark:text-neutral-9-dark" />
        </button>
        <h2 className="font-custom font-bold">{title}</h2>
        <button className="btn btn-sm btn-circle btn-ghost" onClick={() => {}}></button>
      </ModalHeader>
    );
  };

  const getBody = () => {
    return <ModalBody className="inline-flex flex-col">{children}</ModalBody>;
  };
  return (
    <Modal
      className=" bg-background-light dark:bg-background-dark items-center justify-center inline-flex"
      isOpen={isOpen}
      closeButton={<div></div>}
      size={size}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "linear",
            },
          },
          exit: {
            y: -20,
            x: 0,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          },
        },
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="h-full w-full inline-flex flex-col overflow-y-hidden">
              {getHeader({ onPressClose: onClose })}
              <div className="flex flex-1 w-full flex-col overflow-scroll no-scrollbar">
                {getBody()}
              </div>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});

BasicModal.displayName = "BasicModal";
export default BasicModal;
