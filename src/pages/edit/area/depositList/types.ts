import { RootArea } from 'store/slices/types/areas';

export interface DepositListIndexProps {
  area: RootArea;
}

export interface DepositListProps {
  area: RootArea;

  onAddDeposit: () => void;
  onEditDeposit: (id: string) => void;
}
