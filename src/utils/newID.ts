import { useState } from 'react';

let lastId = 0;

export const newID = (prefix = 'id'): string => {
  lastId++;
  return `${prefix}${lastId}`;
};

export const useId = (): string => {
  const [id] = useState(newID());
  return id;
};
