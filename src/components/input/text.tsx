import React from 'react';

import newID from 'utils/newID';

import InputBase from './base';
import { InputProps } from './types';

const InputText: React.FC<InputProps> = ({ label, ...rest }) => {
  const id = newID();
  return (
    <InputBase label={label} inputId={id}>
      <input id={id} type="text" className="input input-bordered" {...rest} />
    </InputBase>
  );
};

export default InputText;
