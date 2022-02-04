export interface Coords {
  lat: number;
  lng: number;
}

export interface Area {
  id: string;
  name: string;
  coords: {
    lat: number;
    lng: number;
  }[];
}

export interface AreasState {
  areas: Area[];
  editingArea?: string;
}
