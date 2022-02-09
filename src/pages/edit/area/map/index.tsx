import React from 'react';

import { MapEventListener } from 'react-mapycz';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store/hooks';
import {
  addDepositCoords,
  findDeposit,
  moveEditingDepositMarker,
  startEditingDepositMarker,
} from 'store/slices/areas';

import Map from './map';
import { MapIndexProps } from './types';

const MapIndex: React.FC<MapIndexProps> = props => {
  const { editingDepositCoords, markerShowDeposit } = useSelector(state => ({
    editingDepositCoords: findDeposit(
      props.area,
      state.areas.editingDepositCoords?.depositId,
    ),
    markerShowDeposit: findDeposit(
      props.area,
      state.areas.markerShowDeposit?.depositId,
    ),
  }));
  const dispatch = useDispatch();

  const handleMapEvent: MapEventListener = (event, coords): void => {
    // @ts-ignore
    if (event.type === 'marker-click') {
      dispatch(
        startEditingDepositMarker({
          coords: {
            // eslint-disable-next-line no-underscore-dangle
            lng: event.target._coords.x,
            // eslint-disable-next-line no-underscore-dangle
            lat: event.target._coords.y,
          },
        }),
      );
    }
    if (event.type === 'map-click') {
      dispatch(
        addDepositCoords({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
      dispatch(
        moveEditingDepositMarker({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
    }
  };

  return (
    <Map
      area={props.area}
      editingDepositCoords={editingDepositCoords}
      markerShowDeposit={markerShowDeposit}
      onEvent={handleMapEvent}
    />
  );
};

export default MapIndex;
