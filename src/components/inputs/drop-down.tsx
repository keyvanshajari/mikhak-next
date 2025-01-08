import React, { useState } from "react";
import clsx from "clsx";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function BasicDropDown<T>({
  title,
  items,
  selected,
  onSelect,
  renderItem,
}: {
  title?: string | null;
  items: Array<T>;
  selected: T;
  onSelect: (item: T) => void;
  renderItem: (item: T | null) => string;
}) {
  const onChange = (e: T) => {
    onSelect(e);
  };

  return (
    <div className="w-full">
      <p className="text-neutral-7-light dark:text-neutral-7-dark text-sm">{title}</p>

      <Listbox value={selected} onChange={onChange}>
        <ListboxButton
          className={clsx(
            "border-[1.5px] focus:border-primary data-[focus]:border-primary h-11 mt-2",
            "relative inline-flex items-center w-full rounded-md py-1.5 pl-8 pr-3 text-right text-base text-neutral-10-light",
            "focus:outline-none data-[focus]:outline-0 data-[focus]:-outline-offset-0 data-[focus]:outline-primary"
          )}
        >
          <ChevronDownIcon
            className="group pointer-events-none absolute self-center left-2.5 size-4 fill-neutral-10-light"
            aria-hidden="true"
          />
          <p className="!font-custom">{renderItem(selected)}</p>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-neutral-3-light bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {items.map((item, index) => (
            <ListboxOption
              key={index + (title ?? "i")}
              value={item}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white"
            >
              <div className="text-base text-neutral-9-light">{renderItem(item)}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
