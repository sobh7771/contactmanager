import React from 'react';
import PropTypes from 'prop-types';

const TextInputGroup = props => {
  const { type, name, value, placeholder, label, error, onChange } = props;

  const className = error[name]
    ? 'form-control form-control-lg is-invalid'
    : 'form-control form-control-lg';
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error[name] ? (
        <div className="invalid-feedback">{error[name]}</div>
      ) : null}
    </div>
  );
};

TextInputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

TextInputGroup.defaultProps = {
  type: 'text',
  error: {}
};

export default TextInputGroup;
