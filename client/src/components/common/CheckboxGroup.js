import React from "react";

const CheckBoxGroup = ({ name, placeholder, value, label, error, info, type, onChange, disabled }) => {
  return (
    <div className="customCheck">
      <label
        onClick={() => {
          onChange(!value, name);
        }}
      >
        <span className="checkLabel">{label}</span>
        {value ? <i className="far fa-check-square" /> : <i className="far fa-square" />}
      </label>
    </div>
  );
};

export default CheckBoxGroup;
