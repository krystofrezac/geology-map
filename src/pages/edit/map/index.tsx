import React from 'react';

import { MapEventListener } from 'react-mapycz';
import { useDispatch, useSelector } from 'store/hooks';
import {
  addAreaCoordinates,
  areaMoveCoordinates,
  findArea,
  startEditingMarker,
} from 'store/slices/areas';

import Map from './map';

const MapIndex: React.FC = () => {
  const { areas, editingAreaCoords, markerShowArea, movingCoords } =
    useSelector(state => ({
      areas: state.areas.areas,
      editingAreaCoords: findArea(
        state.areas.areas,
        state.areas.editingAreaCoords,
      ),
      markerShowArea: findArea(state.areas.areas, state.areas.markerShowArea),
      movingCoords: state.areas.movingCoords,
    }));
  const dispatch = useDispatch();

  const handleMapEvent: MapEventListener = (event, coords) => {
    // @ts-ignore
    if (event.type === 'marker-click') {
      dispatch(
        startEditingMarker({
          // eslint-disable-next-line no-underscore-dangle
          lng: event.target._coords.x,
          // eslint-disable-next-line no-underscore-dangle
          lat: event.target._coords.y,
        }),
      );
    }
    if (event.type === 'map-click' && coords) {
      dispatch(
        areaMoveCoordinates({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
      dispatch(
        addAreaCoordinates({ coords: { lng: coords.x, lat: coords.y } }),
      );
    }
  };

  return (
    <Map
      areas={areas}
      editingAreaCoords={editingAreaCoords}
      markerShowArea={markerShowArea}
      movingCoords={movingCoords}
      onMapEvent={handleMapEvent}
    />
  );
};

export default MapIndex;
