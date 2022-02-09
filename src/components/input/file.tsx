import React from 'react';

import { useId } from 'utils/newID';

import InputBase from './base';
import { InputProps } from './types';

const FileInput: React.FC<InputProps> = ({ label, ...rest }) => {
  const id = useId();
  return (
    <InputBase label={label} inputId={id}>
      <input id={id} type="file" {...rest} />
    </InputBase>
  );
};

export default FileInput;
