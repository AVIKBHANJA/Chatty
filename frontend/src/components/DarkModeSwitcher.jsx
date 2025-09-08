import { Moon, Sun } from "@phosphor-icons/react";
import React from "react";
import useColorMode from "../hooks/useColorMode";

export default function DarkModeSwitcher() {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li className="list-none">
      <label
        htmlFor=""
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          colorMode === "dark" ? "bg-primary" : "bg-stroke"
        }`}
      >
        <input
          type="checkbox"
          className="absolute z-50 top-0 m-0 h-full w-full cursor-pointer opacity-0"
          onChange={() => {
            if (typeof setColorMode === "function") {
              setColorMode(colorMode === "light" ? "dark" : "light");
            }
          }}
        />

        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white duration-75 ease-linear ${
            colorMode === "dark" && "!right-[3px] !translate-x-full"
          }`}
        >
          <span className="dark:hidden">
            <Sun />
          </span>
          <span className="hidden dark:inline-block">
            <Moon />
          </span>
        </span>
      </label>
    </li>
  );
}
