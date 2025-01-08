import React from "react";

const BasicModal = ({
  children,
  dialogId,
  title,
}: {
  children: React.ReactNode;
  dialogId: string;
  title: string;
}) => {
  const closeDialog = () => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <dialog id={dialogId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box p-0">
        <div className="flex flex-col justify-start items-star">
          <div className="w-full flex flex-row items-center justify-between p-6 border-b-2">
            <button className="btn btn-sm btn-circle btn-ghost" onClick={closeDialog}>
              ✕
            </button>
            <h2 className="font-custom font-bold">{title}</h2>
            <div className="btn btn-sm btn-circle btn-ghost"></div>
          </div>
          <div className="w-full py-4 px-6">{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default BasicModal;
