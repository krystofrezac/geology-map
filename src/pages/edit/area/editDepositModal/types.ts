import { RootArea } from 'store/slices/types/areas';

export interface EditDepositModalIndexProps {
  area: RootArea;
}

export interface EditValues {
  name: string;
  color: string;
}

export interface EditDepositModalProps {
  open: boolean;

  onClose: () => void;
  onAdd: (values: EditValues) => void;
}
