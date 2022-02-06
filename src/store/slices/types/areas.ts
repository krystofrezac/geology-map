export interface Coords {
  lat: number;
  lng: number;
}

export interface Area {
  id: string;
  name: string;
  color: string;
  coords: {
    lat: number;
    lng: number;
  }[];
}

export interface AreaWithExtensions extends Area {
  extensions: Area[];
}

export interface MovingCoords {
  areaId: string;
  coordsIndex: number;
}
export interface AreasState {
  areas: AreaWithExtensions[];
  editingAreaCoords?: string;
  markerShowArea?: string;
  editingCoordsIndex?: number;
  movingCoords?: MovingCoords;
  addingArea: boolean;
  editingArea?: string;
}
