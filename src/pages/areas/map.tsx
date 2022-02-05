import React from 'react';

import { Marker, MarkerLayer, PathLayer, Polygon } from 'react-mapycz';

import MapComponent from 'components/map';

import { MapProps } from './types';

const Map: React.FC<MapProps> = props => {
  return (
    <MapComponent onEvent={props.onMapEvent}>
      <MarkerLayer>
        {(props.editingArea?.coords.length || 3) < 3 &&
          props.editingArea?.coords.map(c => (
            <Marker key={`${c.lat}-${c.lng}`} coords={c} />
          ))}
        {props.markerShowArea?.coords.map(c => (
          <Marker key={`${c.lat}-${c.lng}`} coords={c} />
        ))}
      </MarkerLayer>
      <PathLayer>
        {props.editingArea && <Polygon coords={props.editingArea?.coords} />}
        {props.areas.map(
          area =>
            area.id !== props.editingArea?.id && (
              <Polygon
                key={area.id}
                coords={area.coords}
                options={{
                  opacity: props.editingArea ? 0.1 : 0.5,
                  outlineOpacity: 0,
                }}
              />
            ),
        )}
      </PathLayer>
    </MapComponent>
  );
};

export default Map;
