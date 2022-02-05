import { MapEventListener } from 'react-mapycz';
import { Area, MovingCoords } from 'store/slices/types/areas';

export interface MapProps {
  areas: Area[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;
  movingCoords?: MovingCoords;
  onMapEvent: MapEventListener;
}
