import { MapEventListener } from 'react-mapycz';
import { Area } from 'store/slices/types/areas';

export interface AddAreaModalProps {
  open: boolean;
  onClose: () => void;
}

export interface MapProps {
  areas: Area[];
  editingArea?: Area;
  onMapEvent: MapEventListener;
}

export interface AreasProps {
  areas: Area[];
  editingArea?: Area;

  onAddAreaOpen: () => void;
  onAddAreaClose: () => void;
  onAreaEditStart: (id: string) => void;
  onAreaEditEnd: () => void;
}
