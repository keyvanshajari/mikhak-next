import { CategoryModel } from "@/backend/models/base";
import { normilizeUpperText } from "@/common/helper/format-helper";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CollapsibleTree = ({ data }: { data: CategoryModel[] }) => {
  const renderTree = (nodes: CategoryModel[]) => {
    return nodes.map((node) => <TreeNodeComponent key={node.id} node={node} />);
  };

  return <div>{renderTree(data)}</div>;
};

const TreeNodeComponent: React.FC<{ node: CategoryModel }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div dir="rtl" className="flex flex-col px-2">
      <div className="cursor-pointer flex flex-row justify-start items-center gap-2 h-12 font-custom text-base text-neutral-11-light dark:text-neutral-11-dark">
        <div className="flex flex-1">{normilizeUpperText(node.name)}</div>
        <span
          className="text-neutral-8-light text-2xl w-5 h-5 inline-flex justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {hasChildren &&
            (isOpen ? (
              <FiChevronUp className="w-full h-full" />
            ) : (
              <FiChevronDown className="w-full h-full" />
            ))}
        </span>
      </div>
      {hasChildren && isOpen && (
        <div className="inline-flex flex-row items-start mb-4">
          <div className="w-1 divider divider-horizontal custom-divider-horizontal  bg-neutral-3-light" />
          <div className="flex flex-1 flex-col justify-between">
            {node.children!.map((child) => (
              <TreeNodeComponent key={child.id} node={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleTree;
