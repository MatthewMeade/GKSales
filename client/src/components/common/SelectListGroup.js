import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListGroup = ({ name, value, error, info, onChange, options, label, required }) => {
  const selectOptions = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <label>{label}</label>

      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value || ""}
        onChange={e => onChange(e.target.value, e.target.name)}
        required={required}
      >
        <option disabled value="">
          Select {label}
        </option>
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
