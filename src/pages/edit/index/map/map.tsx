import React from 'react';

import { Marker, MarkerLayer, PathLayer, Polygon } from 'react-mapycz';
import { findAreaParent } from 'store/slices/areas';
import { Area } from 'store/slices/types/areas';

import MapComponent from 'components/map';

import { MapProps } from './types';

const Map: React.FC<MapProps> = props => {
  const drawArea = (area: Area): JSX.Element | undefined | false =>
    area.id !== props.editingAreaCoords?.id &&
    area.id !== props.markerShowArea?.id && (
      <Polygon
        key={area.id}
        coords={area.coords}
        options={{
          color: area.color,
          opacity: props.editingAreaCoords || props.markerShowArea ? 0.2 : 0.5,
          outlineOpacity: 0,
        }}
      />
    );

  const drawEditingArea = (): JSX.Element | undefined => {
    const parentArea = findAreaParent(props.areas, props.editingAreaCoords?.id);
    return (
      props.editingAreaCoords && (
        <Polygon
          coords={props.editingAreaCoords?.coords}
          options={{
            color: parentArea?.color || props.editingAreaCoords.color,
            opacity: 0.5,
            outlineColor: parentArea?.color || props.editingAreaCoords.color,
            outlineOpacity: 1,
          }}
        />
      )
    );
  };

  const drawMarkerShowArea = (): JSX.Element | undefined => {
    const parentArea = findAreaParent(props.areas, props.markerShowArea?.id);

    return (
      props.markerShowArea && (
        <Polygon
          coords={props.markerShowArea?.coords}
          options={{
            color: parentArea?.color || props.markerShowArea.color,
            opacity: 0.5,
            outlineColor: parentArea?.color || props.markerShowArea.color,
            outlineOpacity: 1,
          }}
        />
      )
    );
  };

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
        {drawEditingArea()}
        {drawMarkerShowArea()}
        {props.areas.map(area => [
          drawArea(area),
          ...area.extensions.map(extension =>
            drawArea({ ...extension, color: area.color }),
          ),
        ])}
      </PathLayer>
    </MapComponent>
  );
};

export default Map;
