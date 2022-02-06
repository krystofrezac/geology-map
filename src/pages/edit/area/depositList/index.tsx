import React from 'react';

import { useDispatch } from 'store/hooks';
import { startAddingDeposit } from 'store/slices/areas';

import DepositList from './depositList';
import { DepositListIndexProps } from './types';

const DepositListIndex: React.FC<DepositListIndexProps> = props => {
  const dispatch = useDispatch();

  const handleDepositAddModalOpen = (): void => {
    dispatch(startAddingDeposit());
  };

  return (
    <DepositList area={props.area} onAddDeposit={handleDepositAddModalOpen} />
  );
};

export default DepositListIndex;
