import { Area, AreaWithExtensions } from 'store/slices/types/areas';

export interface AreaListIndexState {
  deleteArea?: Area;
}

export interface AreaListProps {
  areas: AreaWithExtensions[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;

  onAddAreaOpen: () => void;
  onAreaEditCoordsStart: (id: string) => void;
  onAreaEditCoordsEnd: () => void;
  onMarkersShow: (id: string) => void;
  onMarkersHide: () => void;
  onAreaEdit: (id: string) => void;
  onAreaDelete: (id: string) => void;
}

export interface AreaListItemProps {
  area: Area;
  editingCoords: boolean;
  markerShow: boolean;

  onAreaEditCoordsClick: () => void;
  onMarkersShowClick: () => void;
  onAreaEdit: () => void;
  onAreaDelete: () => void;
}

export interface DeleteModalProps {
  area?: Area;

  onDelete: () => void;
  onCancel: () => void;
}
