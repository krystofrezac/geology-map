import { MapEventListener } from 'react-mapycz';
import { Deposit, RootArea } from 'store/slices/types/areas';

export interface MapIndexProps {
  area: RootArea;
}

export interface MapProps {
  area: RootArea;
  editingDepositCoords?: Deposit;
  markerShowDeposit?: Deposit;

  onEvent: MapEventListener;
}
