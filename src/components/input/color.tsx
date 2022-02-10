import React from 'react';

import { useId } from 'utils/newID';

import InputBase from './base';
import { InputProps } from './types';

const ColorInput: React.FC<InputProps> = ({ label, ...rest }) => {
  const id = useId();
  return (
    <InputBase label={label} inputId={id}>
      <input
        id={id}
        type="color"
        className="w-20 input input-bordered"
        {...rest}
      />
    </InputBase>
  );
};

export default ColorInput;
