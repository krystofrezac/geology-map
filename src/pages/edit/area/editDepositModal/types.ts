import { Deposit, RootArea } from 'store/slices/types/areas';

export interface EditDepositModalIndexProps {
  area: RootArea;
}

export interface EditValues {
  name: string;
  color: string;
}

export interface EditDepositModalProps {
  open: boolean;
  deposit?: Deposit;

  onClose: () => void;
  onSubmit: (values: EditValues) => void;
}
