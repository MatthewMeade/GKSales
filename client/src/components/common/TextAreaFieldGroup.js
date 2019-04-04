import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Renders a text area with a label
const TextAreaFieldGroup = ({ name, label, placeholder, value, error, info, onChange, rows }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value, e.target.name)}
        rows={rows}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
