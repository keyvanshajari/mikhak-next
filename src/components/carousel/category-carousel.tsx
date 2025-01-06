"use client";
import React from "react";
import { FiInstagram } from "react-icons/fi";
import ArrowController from "../arrow-controller";
import { useRouter } from "next/navigation";
import Routes from "@/common/constants/routes";

export default function CategoryCarousel() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-start justify-start mt-8">
      <ArrowController
        title={"دسته بندی های منتخب"}
        onTapShowMore={() => {
          router.push(Routes.categoryPage);
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <div style={{ width: "fit-content" }} key={"cat" + index}>
            <div className="bg-neutral-2-light flex text-nowrap rounded-md h-16  items-center py-3 px-6 gap-3">
              <div className=" h-full rounded-lg flex items-center justify-center text-3xl text-primary">
                <FiInstagram />
              </div>
              cateee {item}
            </div>
          </div>
        ))}
      </ArrowController>
    </div>
  );
}
