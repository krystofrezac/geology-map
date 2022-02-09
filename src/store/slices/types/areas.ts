export interface Coords {
  lat: number;
  lng: number;
}

export interface Deposit {
  id: string;
  name: string;
  color: string;
  coords: Coords[];
}

export interface Area {
  id: string;
  name: string;
  color: string;
  coords: Coords[];
}

export interface RootArea extends Area {
  extensions: Area[];
  deposits: Deposit[];
}

export interface MovingCoords {
  areaId: string;
  coordsIndex: number;
}
export interface AreasState {
  areas: RootArea[];
  editingAreaCoords?: string;
  markerShowArea?: string;
  editingCoordsIndex?: number;
  movingCoords?: MovingCoords;
  addingArea: boolean;
  editingArea?: string;
  addingDeposit: boolean;
  editingDeposit?: string;
  editingDepositCoords?: { areaId: string; depositId: string };
  markerShowDeposit?: { areaId: string; depositId: string };
  editingDepositCoordsIndex?: number;
  movingEditingDepositCoordsIndex?: number;
}
