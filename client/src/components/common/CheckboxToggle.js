import React from "react";

const CheckboxToggle = ({ name, value, trueLabel, falseLabel, onChange }) => {
  return (
    <div className="checkboxToggle">
      <div className="btnWrapper">
        <div className={`btn btn-primary trueBtn ${value && "selected"}`} onClick={() => onChange(true, name)}>
          {trueLabel}
        </div>
        <div className={`btn btn-primary falseBtn ${!value && "selected"}`} onClick={() => onChange(false, name)}>
          {falseLabel}
        </div>
      </div>
    </div>
  );
};

export default CheckboxToggle;
