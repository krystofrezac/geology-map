export interface HomeProps {
  onDataReset: () => void;
}

export interface ResetDataModalProps {
  open: boolean;

  onCancel: () => void;
  onReset: () => void;
}
