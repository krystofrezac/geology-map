import { RootArea } from 'store/slices/types/areas';

export interface AreaListProps {
  areas: RootArea[];

  onDetailOpen: (id: string) => void;
  onStartHighlight: (id: string) => void;
  onStopHighlight: () => void;
}

export interface DetailModalProps {
  area?: RootArea;

  onClose: () => void;
}

export interface DetailModalState {
  open: boolean;
  area?: RootArea;
}
