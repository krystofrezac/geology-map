import { Area, MovingCoords, RootArea } from 'store/slices/types/areas';

export interface MapProps {
  areas: RootArea[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;
  movingCoords?: MovingCoords;
}
