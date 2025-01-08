import { ColorHelper } from "@/common/helper/string-to-color";
import React from "react";
export enum ImageSize {
  small,
  medium,
  large,
}
export default function UserAvatar({
  name,
  imageUrl,
  imageSize = ImageSize.medium,
}: {
  name: string | undefined | null;
  imageSize?: ImageSize;
  imageUrl?: string | undefined | null;
}) {
  const size = (): string => {
    switch (imageSize) {
      case ImageSize.small:
        return " h-8 w-8 text-xs aspect-square ";

      case ImageSize.medium:
        return " h-11 w-11 text-sm aspect-square ";

      case ImageSize.large:
        return " h-16 w-16 text-lg aspect-square ";
    }
  };

  return (
    <div
      className={`${size()} ml-4 aspect-square rounded-full justify-center items-center flex text-white `}
      style={{
        backgroundColor: ColorHelper.stringToColor(name),
      }}
    >
      {imageUrl && <img src={imageUrl} />}
      {(name ?? "م").at(0)}
    </div>
  );
}
