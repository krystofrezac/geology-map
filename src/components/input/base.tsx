import React from 'react';

import { BaseInputProps } from './types';

const InputBase: React.FC<BaseInputProps> = props => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={props.inputId}>
        <span className="label-text">{props.label}</span>
      </label>
      {props.children}
    </div>
  );
};

export default InputBase;
