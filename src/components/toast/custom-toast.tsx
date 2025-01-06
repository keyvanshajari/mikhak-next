import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CustomToastContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export { toast };
