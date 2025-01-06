import React from "react";

export enum ButtonSize {
  small,
  medium,
  large,
  xlarge,
}

export type IButton = {
  tooltipText?: string | null;
  buttonSize?: ButtonSize | null;
  className?: string;
  textColor?: string;
  disabled?: boolean;
  children?: any;
  type?: string | null;
  loading?: boolean | undefined;
  PreffixIcon?: React.FC<{ [key: string]: any }> | null;
  SuffixIcon?: React.FC<{ [key: string]: any }> | null;
} & React.ComponentProps<"button">;
