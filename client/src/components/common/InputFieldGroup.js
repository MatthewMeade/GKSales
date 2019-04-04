import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Renders an input and a label
const InputFieldGroup = ({ name, placeholder, value, label, error, info, type, onChange, disabled, min }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        min={min}
        onChange={e => onChange(e.target.value, e.target.name)}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  // value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabed: PropTypes.string,
};

InputFieldGroup.defaultProps = {
  type: "text",
};

export default InputFieldGroup;
