import { Deposit, RootArea } from 'store/slices/types/areas';

export interface MapProps {
  area: RootArea;
  editingDepositCoords?: Deposit;
  markerShowDeposit?: Deposit;
}
