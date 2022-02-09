export interface HomeProps {
  onDataReset: () => void;
  onDataExport: () => void;
  onDataImport: () => void;
}

export interface ResetDataModalProps {
  open: boolean;

  onCancel: () => void;
  onReset: () => void;
}

export interface ImportModalProps {
  open: boolean;

  onCancel: () => void;
  onImport: (data: Record<string, any>) => void;
}
