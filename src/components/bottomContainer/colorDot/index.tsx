import React from 'react';

import { ColorDotProps } from './types';

const ColorDotIndex: React.FC<ColorDotProps> = props => (
  <div
    className="h-4 w-4 rounded-full"
    style={{ minWidth: '1rem', backgroundColor: props.color }}
  />
);

export default ColorDotIndex;
