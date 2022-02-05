import React from 'react';

import newID from 'utils/newID';

import InputBase from './base';
import { InputProps } from './types';

const ColorInput: React.FC<InputProps> = ({ label, ...rest }) => {
  const id = newID();
  return (
    <InputBase label={label} inputId={id}>
      <input
        id={id}
        type="color"
        className="input input-bordered w-20"
        {...rest}
      />
    </InputBase>
  );
};

export default ColorInput;
