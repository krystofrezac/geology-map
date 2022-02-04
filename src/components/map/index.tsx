import React from 'react';

import {
  CompassControl,
  KeyboardControl,
  Map,
  MapProps,
  MouseControl,
  ZoomControl,
} from 'react-mapycz';

const MapIndex: React.FC<MapProps> = props => (
  <Map
    height="100vh"
    zoom={7}
    loadingElement={
      <div className="flex h-screen items-center justify-center">
        Načítají se data
      </div>
    }
    {...props}
  >
    <KeyboardControl />
    <MouseControl zoom pan wheel />
    <ZoomControl left={10} />
    <CompassControl left={10} top={50} />
  </Map>
);
export default MapIndex;