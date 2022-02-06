import React from 'react';

import { useDispatch } from 'store/hooks';
import { startAddingDeposit, startEditingDeposit } from 'store/slices/areas';

import DepositList from './depositList';
import { DepositListIndexProps } from './types';

const DepositListIndex: React.FC<DepositListIndexProps> = props => {
  const dispatch = useDispatch();

  const handleDepositAdd = (): void => {
    dispatch(startAddingDeposit());
  };

  const handleDepositEdit = (id: string): void => {
    dispatch(startEditingDeposit({ id }));
  };

  return (
    <DepositList
      area={props.area}
      onAddDeposit={handleDepositAdd}
      onEditDeposit={handleDepositEdit}
    />
  );
};

export default DepositListIndex;
