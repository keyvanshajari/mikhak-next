"use client";
import { useState, useEffect } from "react";

import styles from "./multi-range-slider.module.css";

export default function MultiRangeSlider() {
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(90);
  const [minPos, setMinPos] = useState(0);
  const [maxPos, setMaxPos] = useState(0);
  const min = 0;
  const max = 100;

  useEffect(() => {
    setMinPos((minValue * 100) / (max - min));
    setMaxPos((maxValue * 100) / (max - min));
  }, [minValue, maxValue]);

  const handleMinChange = (v: number) => {
    const value = Math.min(v, maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (v: number) => {
    const value = Math.max(v, minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="w-full m-auto">
      <div className={"relative h-4 flex items-center"}>
        <div className="w-full h-1 rounded-full bg-neutral-3-light inline-flex items-center relative z-0 my-auto">
          <div
            className="bg-primary-5-light h-2 absolute"
            style={{
              right: `${minPos}%`,
              width: `${maxPos - minPos}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className={`${styles.rangeInput} ${styles.minRange}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className={`${styles.rangeInput} ${styles.maxRange}`}
        />
      </div>
      <div className={styles.values}>
        <span>Min: {minValue}</span>
        <span>Max: {maxValue}</span>
      </div>
    </div>
  );
}
