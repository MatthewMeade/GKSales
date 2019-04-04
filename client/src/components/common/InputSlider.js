import React from "react";
import InputRange from "react-input-range";
import "../../../node_modules/react-input-range/lib/css/index.css";

// Renders a slider
export default function InputSlider({ name, value, min, max, step, onChange, formatLabel }) {
  return (
    <div className="inputSlider">
      <InputRange
        formatLabel={formatLabel}
        step={step}
        maxValue={max}
        minValue={min}
        value={value}
        onChange={value => onChange(Math.floor(parseFloat(value * 10)) / 10, name)}
        name={name}
      />
    </div>
  );
}
