import React from 'react';

import { useId } from 'utils/newID';

import InputBase from './base';
import { SelectProps } from './types';

const SelectInput: React.FC<SelectProps> = ({ label, options, ...rest }) => {
  const id = useId();
  return (
    <InputBase label={label} inputId={id}>
      <select id={id} className="select select-bordered" {...rest}>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </InputBase>
  );
};

export default SelectInput;
