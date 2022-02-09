export interface BottomInfoProps {
  movingCoords: boolean;
  editingCoords: boolean;
  showMarkers: boolean;
  onMarkerMoveCancel: () => void;
  onDepositEditCoordsEnd: () => void;
  onHideDepositMarkers: () => void;
}
