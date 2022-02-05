export interface BottomInfoProps {
  movingCoords: boolean;
  editingAreaCoords: boolean;
  markerShowArea: boolean;
  onMarkerMoveCancel: () => void;
  onAreaEditCoordsEnd: () => void;
  onHideAreaMarkers: () => void;
}
