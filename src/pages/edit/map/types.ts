import { MapEventListener } from 'react-mapycz';
import {
  Area,
  AreaWithExtensions,
  MovingCoords,
} from 'store/slices/types/areas';

export interface MapProps {
  areas: AreaWithExtensions[];
  editingAreaCoords?: Area;
  markerShowArea?: Area;
  movingCoords?: MovingCoords;
  onMapEvent: MapEventListener;
}
