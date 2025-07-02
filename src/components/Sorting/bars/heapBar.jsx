import React from "react";
import { motion } from "framer-motion";
import { useSorting } from "../../../context/sortingContext";

export default function HeapBar() {
  const { bars, compareInfo } = useSorting();

  return (
    <>
      {bars.map((value, index) => {
        const isSmaller = compareInfo.smaller === index;
        const isLarger = compareInfo.larger === index;

        return (
          <motion.div
            key={index}
            className={`w-full rounded-t-md ${
              isSmaller
                ? "bg-red-400"
                : isLarger
                ? "bg-green-400"
                : "bg-blue-500"
            }`}
            style={{
              height: `${value * 3}px`,
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
