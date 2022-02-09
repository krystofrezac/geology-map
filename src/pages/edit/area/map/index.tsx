import React from 'react';

import { MapEventListener } from 'react-mapycz';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store/hooks';
import { addDepositCoords, findDeposit } from 'store/slices/areas';

import Map from './map';
import { MapIndexProps } from './types';

const MapIndex: React.FC<MapIndexProps> = props => {
  const { editingDepositCoords } = useSelector(state => ({
    editingDepositCoords: findDeposit(
      props.area,
      state.areas.editingDepositCoords?.depositId,
    ),
  }));
  const dispatch = useDispatch();

  const handleMapEvent: MapEventListener = (event, coords): void => {
    if (event.type === 'map-click') {
      dispatch(
        addDepositCoords({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
    }
  };

  return (
    <Map
      area={props.area}
      editingDepositCoords={editingDepositCoords}
      onEvent={handleMapEvent}
    />
  );
};

export default MapIndex;
