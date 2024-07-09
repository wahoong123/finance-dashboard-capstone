import React from "react";

const InputField = ({ type, placeholder, value, onChange, className }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );

export default InputField;