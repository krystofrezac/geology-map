import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { findDeposit, findRootArea } from 'store/slices/areas';

import Map from './map';

const MapIndex: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();

  const { area, highlightDeposit, detailDeposit } = useSelector(state => {
    const ar = findRootArea(state.areas.areas, areaId);
    return {
      area: ar,

      highlightDeposit: ar
        ? findDeposit(ar, state.presentation.highlightDeposit)
        : undefined,
      detailDeposit: ar
        ? findDeposit(ar, state.presentation.detailDeposit)
        : undefined,
    };
  });

  if (!area) return null;
  return (
    <Map area={area} highlightDeposit={highlightDeposit || detailDeposit} />
  );
};

export default MapIndex;
