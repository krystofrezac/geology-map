import React from 'react';

import { Marker, MarkerLayer, PathLayer, Polygon } from 'react-mapycz';

import MapComponent from 'components/map';

import { MapProps } from './types';

const Map: React.FC<MapProps> = props => {
  return (
    <MapComponent onEvent={props.onMapEvent}>
      <MarkerLayer>
        {(props.editingAreaCoords?.coords.length || 3) < 3 &&
          props.editingAreaCoords?.coords.map(c => (
            <Marker key={`${c.lat}-${c.lng}`} coords={c} />
          ))}
        {props.markerShowArea?.coords.map(
          (c, index) =>
            (!props.movingCoords ||
              index === props.movingCoords.coordsIndex) && (
              <Marker key={`${c.lat}-${c.lng}`} coords={c} />
            ),
        )}
      </MarkerLayer>
      <PathLayer>
        {props.editingAreaCoords && (
          <Polygon
            coords={props.editingAreaCoords?.coords}
            options={{
              color: props.editingAreaCoords.color,
              opacity: 0.5,
              outlineColor: props.editingAreaCoords.color,
              outlineOpacity: 1,
            }}
          />
        )}
        {props.markerShowArea && (
          <Polygon
            coords={props.markerShowArea?.coords}
            options={{
              color: props.markerShowArea.color,
              opacity: 0.5,
              outlineColor: props.markerShowArea.color,
              outlineOpacity: 1,
            }}
          />
        )}
        {props.areas.map(
          area =>
            area.id !== props.editingAreaCoords?.id &&
            area.id !== props.markerShowArea?.id && (
              <Polygon
                key={area.id}
                coords={area.coords}
                options={{
                  color: area.color,
                  opacity:
                    props.editingAreaCoords || props.markerShowArea ? 0.2 : 0.5,
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
