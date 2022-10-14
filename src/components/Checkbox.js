import React from 'react';
import '../styles/checkbox.css';

const Checkbox = ({ selectItem, checked }) => {
  return (
    <label className="container">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          selectItem();
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
