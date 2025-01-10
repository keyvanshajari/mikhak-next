interface ButtonGroupProps {
  title: string;
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const CustomButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  selectedIndex,
  onSelect,
  title,
}) => {
  return (
    <div className="w-full flex flex-col">
      <label className="mb-3 text-sm font-medium text-neutral-8-light dark:text-neutral-8-dark">
        {title}
      </label>
      <div dir="ltr" className="w-full inline-flex rounded-md shadow-sm">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`flex flex-1 items-center justify-center px-4 py-2 text-sm  text-neutral-10-light bg-background-light border border-neutral-4-light ${
              index === 0 ? "rounded-l-lg" : ""
            } ${index === items.length - 1 ? "rounded-r-lg" : ""} ${
              selectedIndex === index
                ? "z-10 ring-2 ring-primary-5-light text-primary-5-light font-bold "
                : " font-medium "
            } hover:bg-gray-100 hover:text-primaring-primary-5-light`}
            onClick={() => onSelect(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
