import { Deposit, RootArea } from 'store/slices/types/areas';

export interface DepositListProps {
  area: RootArea;

  onDetailOpen: (id: string) => void;
  onStartHighlight: (id: string) => void;
  onStopHighlight: () => void;
}

export interface DetailModalProps {
  deposit?: Deposit;

  onClose: () => void;
}

export interface DetailModalState {
  open: boolean;
  deposit?: Deposit;
}
