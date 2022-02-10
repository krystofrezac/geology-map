import { Area, RootArea } from 'store/slices/types/areas';

export interface AreaListIndexState {
  deleteArea?: Area;
}

export interface AreaListProps {
  areas: RootArea[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;

  onAddAreaOpen: () => void;
  onAreaEditCoordsStart: (id: string) => void;
  onAreaEditCoordsEnd: () => void;
  onMarkersShow: (id: string) => void;
  onMarkersHide: () => void;
  onAreaEdit: (id: string) => void;
  onAreaDelete: (id: string) => void;
  onAreaMoveUp: (id: string) => void;
  onAreaMoveDown: (id: string) => void;
}

export interface AreaListItemProps {
  area: Area;
  editingCoords: boolean;
  markerShow: boolean;
  rootArea: boolean;

  onAreaEditCoordsClick: () => void;
  onMarkersShowClick: () => void;
  onAreaEdit: () => void;
  onAreaDelete: () => void;
  onAreaMoveUp?: () => void;
  onAreaMoveDown?: () => void;
}

export interface DeleteModalProps {
  area?: Area;

  onDelete: () => void;
  onCancel: () => void;
}
