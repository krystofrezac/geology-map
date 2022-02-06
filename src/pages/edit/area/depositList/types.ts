import { Deposit, RootArea } from 'store/slices/types/areas';

export interface DepositListIndexProps {
  area: RootArea;
}

export interface DepositListIndexState {
  deletingDeposit?: Deposit;
}

export interface DepositListProps {
  area: RootArea;

  onDepositAdd: () => void;
  onDepositEdit: (id: string) => void;
  onDepositDelete: (id: string) => void;
}

export interface DeleteModalProps {
  deposit?: Deposit;

  onCancel: () => void;
  onDelete: () => void;
}
