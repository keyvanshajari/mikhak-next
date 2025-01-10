import { fontFamily } from "tailwindcss/defaultTheme";
import MyCustomColors from "./colors";
import { nextui } from "@nextui-org/react";

module.exports = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...MyCustomColors,
      },
      borderRadius: {
        xl: "0.625rem;",
      },
      fontFamily: {
        custom: ["vazir", ...fontFamily.sans],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.813rem",
        base: "0.875rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.563rem",
        "4xl": "1.953rem",
        "5xl": "2.441rem",
      },
      aspectRatio: {
        "1/2": "1/2",
        "2": "2",
        "2.5": "2.5",
        "3": "3",
        "3/2": "3/2",
        "4": "4",
        "5": "5",
        "5/6": "5/6",
        "6": "6",
        "8": "8",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar"), nextui()],

  variants: {
    scrollbar: ["rounded"],
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: MyCustomColors.primary.DEFAULT,
          secondary: MyCustomColors.secondary.DEFAULT,
        },
      },
    ],

    darkTheme: "light", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
