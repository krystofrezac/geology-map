import { Area } from 'store/slices/types/areas';

export interface EditValues {
  name: string;
  color: string;
  extend?: string;
  description: string;
}
export interface EditAreaModalProps {
  open: boolean;
  area?: Area;
  extend?: string;
  areas: Area[];
  onAreaEdit: (values: EditValues) => void;
  onClose: () => void;
}

export interface EditAreaModalState {
  name: string;
  color: string;
  extend?: string;
  description: string;
}
