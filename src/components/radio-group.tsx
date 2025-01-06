import React from "react";

interface RadioGroupProps<T> {
  items: { label: string; value: T }[];
  onChange: (value: T) => void;
  selectedValue: T;
}

const RadioGroup = <T,>({ items, onChange, selectedValue }: RadioGroupProps<T>) => {
  return (
    <div className="flex flex-row gap-x-4 my-4">
      {items.map((item, index) => (
        <div key={"rd" + index}>
          <input
            className="relative align-middle gap-x-1 h-4 w-4 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0
             before:shadow-[0px_0px_0px_0px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-secondary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 
             checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-secondary checked:after:bg-secondary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]
             hover:before:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.6)] 
            focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-secondary checked:focus:before:scale-100 
            checked:focus:before:shadow-[0px_0px_0px_0px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-secondary dark:checked:after:border-secondary dark:checked:after:bg-secondary 
            dark:focus:before:shadow-[0px_0px_0px_0px_rgba(255,255,255,0.4)] dark:checked:focus:border-secondary dark:checked:focus:before:shadow-[0px_0px_0px_0px_#3b71ca]"
            type="radio"
            name={"rd" + item.value}
            id={"rd" + item.value}
            value={`${item.value}`}
            checked={item.value === selectedValue}
            onChange={() => onChange(item.value)}
          />
          <label
            className="inline-block text-base px-1 hover:cursor-pointer"
            htmlFor={"rd" + item.value}
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
