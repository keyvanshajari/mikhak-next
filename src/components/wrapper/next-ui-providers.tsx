"use client";
import { NextUIProvider } from "@nextui-org/react";

export function CustomUIProviders({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
