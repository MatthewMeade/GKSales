import React from "react";

// Displays a single toggleable checkbox
const Checkbox = ({ name, value, label, onChange, labelPos }) => {
  return (
    <div className="customCheck">
      <label
        onClick={() => {
          onChange(!value, name);
        }}
      >
        {labelPos !== "right" && <span className="checkLabel">{label}</span>}
        {value ? <i className="far fa-check-square" /> : <i className="far fa-square" />}
        {labelPos === "right" && <span className="checkLabel ml-2">{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
