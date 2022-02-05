import { Area } from 'store/slices/types/areas';

export interface EditValues {
  name: string;
  color: string;
}
export interface EditAreaModalProps {
  open: boolean;
  area?: Area;
  onAreaEdit: (values: EditValues) => void;
  onClose: () => void;
}
