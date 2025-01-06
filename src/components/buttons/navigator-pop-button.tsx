"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function PopNavigatorButton() {
  const router = useRouter();
  const [canPop, setCanPop] = useState(false);

  useEffect(() => {
    setCanPop(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (canPop) {
      router.back();
    } else {
      console.log("Cannot go back");
    }
  };

  if (canPop)
    return (
      <div onClick={handleBack} className="text-2xl text-neutral-11-light">
        <FiArrowRight />
      </div>
    );
}
