import React from "react";
import ArrowController from "../arrow-controller";
import ProductFullCard from "../cards/product_full_card";

export function ListProductFull() {
  return (
    <ArrowController
      title={"اجاره آپارتمان روزانه در تهران"}
      subTitle="اقامتِ با کیفیت تو پایتخت با ما"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
        <div className="min-w-[280px] max-w-[280px]" key={"pl" + index}>
          <ProductFullCard />
        </div>
      ))}
    </ArrowController>
  );
}
