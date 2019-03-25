import React from "react";

const CheckBoxGroup = ({ name, placeholder, value, label, error, info, type, onChange, disabled, labelPos }) => {
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

export default CheckBoxGroup;
