"use client";
import { BasicDropDown } from "@/components/inputs/drop-down";
import { useState } from "react";

interface IPerson {
  id: number;
  name: string;
}
const people: Array<IPerson> = [
  { id: 1, name: "کیوان شجری" },
  { id: 2, name: "علی رضا شجری" },
  { id: 3, name: "کتی" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export default function Example() {
  const [doctor, setDoctor] = useState(people[0]);
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-bold font-custom text-2xl mt-6 mb-11">ثبت نام میخک</h1>

      <BasicDropDown<IPerson>
        items={people}
        selected={doctor}
        onSelect={setDoctor}
        title={"دکتر:"}
        renderItem={(item) => item?.name ?? ""}
      />
    </div>
  );
}
