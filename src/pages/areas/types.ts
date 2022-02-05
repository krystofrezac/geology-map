import { MapEventListener } from 'react-mapycz';
import { Area } from 'store/slices/types/areas';

export interface AreaAddValues {
  name: string;
  color: string;
}

export interface AddAreaModalProps {
  open: boolean;
  area?: Area;
  onAreaAdd: (values: AreaAddValues) => void;
  onClose: () => void;
}

export interface EditMarkerModalProps {
  open: boolean;
  onClose: () => void;
  onMarkerDelete: () => void;
  onMarkerMove: () => void;
}

export interface MapProps {
  areas: Area[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;
  onMapEvent: MapEventListener;
}

export interface AreasProps {
  areas: Area[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;

  onAddAreaOpen: () => void;
  onAddAreaClose: () => void;
  onAreaEditCoordsStart: (id: string) => void;
  onAreaEditCoordsEnd: () => void;
  onMarkersShow: (id: string) => void;
  onMarkersHide: () => void;
  onAreaEdit: (id: string) => void;
}

export interface AreasIndexState {
  addArea: boolean;
  editingArea?: Area;
}
