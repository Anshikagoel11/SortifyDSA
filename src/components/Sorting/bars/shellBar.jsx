import React from "react";
import { motion } from "framer-motion";
import { useSorting } from "../../../context/sortingContext";

export default function ShellBar() {
  const { bars, compareInfo } = useSorting();

  return (
    <>
      {bars.map((val, i) => {
        const isSmaller = compareInfo.smaller === i;
        const isLarger = compareInfo.larger === i;

        return (
          <motion.div
            key={i}
            className={`w-full rounded-t-md ${
              isSmaller
                ? "bg-red-400"
                : isLarger
                ? "bg-green-400"
                : "bg-blue-500"
            }`}
            style={{
              height: `${val * 3}px`,
              width: `${100 / bars.length}%`,
              transition: "height 0.3s ease",
            }}
            layout
          />
        );
      })}
    </>
  );
}
