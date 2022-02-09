import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { findDeposit, findRootArea } from 'store/slices/areas';

import Map from './map';

const MapIndex: React.FC = () => {
  const params = useParams<{ areaId: string }>();
  const { areaId } = params;
  const { area } = useSelector(state => ({
    area: findRootArea(state.areas.areas, areaId),
  }));

  const { editingDepositCoords, markerShowDeposit } = useSelector(state => ({
    editingDepositCoords:
      area && findDeposit(area, state.areas.editingDepositCoords?.depositId),
    markerShowDeposit:
      area && findDeposit(area, state.areas.markerShowDeposit?.depositId),
  }));

  if (!area) return <div>Tato oblast neexistuje</div>;
  return (
    <Map
      area={area}
      editingDepositCoords={editingDepositCoords}
      markerShowDeposit={markerShowDeposit}
    />
  );
};

export default MapIndex;
