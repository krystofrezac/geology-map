import React from 'react';

import { IconButtonIndexTypes } from './types';

export const iconButtonClass = 'btn btn-xs h-6 w-6 p-1';

const IconButtonIndex: React.FC<IconButtonIndexTypes> = props => (
  <button
    type="button"
    {...props}
    className={`${iconButtonClass} ${props.className ? props.className : ''}`}
  />
);

export default IconButtonIndex;
