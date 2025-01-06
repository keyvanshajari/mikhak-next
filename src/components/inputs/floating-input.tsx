import React from "react";

export default function FloatingInput() {
  return (
    <div className="bg-white rounded-md my-6">
      <div className="relative bg-inherit">
        <input
          type="text"
          id="phonenumber"
          name="phonenumber"
          className="peer font-custom w-full bg-transparent placeholder-transparent  p-4 border-2 rounded-md text-left focus:ring-0 focus:outline-1"
          placeholder="شماره موبایل"
        />
        <label
          htmlFor="phonenumber"
          className="absolute font-custom  bg-inherit cursor-text right-1 text-sm text-neutral-7-light mx-1 px-2 pt-1 focus:pt-0
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          شماره موبایل
        </label>
      </div>
    </div>
  );
}
