import React from "react";
import ArrowController from "../arrow-controller";

import { ProductLongCard } from "../cards/product_long_card";

export function ListProductLong() {
  return (
    <ArrowController
      title="اجاره اقامتگاه با تخفیف در شهرهای جنوبی"
      subTitle="تجربه اقامت در کنار مردم خونگرم جنوب با ما"
      className="gap-6"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
        <div key={"pl" + index}>
          <ProductLongCard />
        </div>
      ))}
    </ArrowController>
  );
}
