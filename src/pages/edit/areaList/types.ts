import { Area } from 'store/slices/types/areas';

export interface AreaListProps {
  areas: Area[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;

  onAddAreaOpen: () => void;
  onAreaEditCoordsStart: (id: string) => void;
  onAreaEditCoordsEnd: () => void;
  onMarkersShow: (id: string) => void;
  onMarkersHide: () => void;
  onAreaEdit: (id: string) => void;
}
