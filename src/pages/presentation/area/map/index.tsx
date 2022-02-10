import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { findRootArea } from 'store/slices/areas';

import Map from './map';

const MapIndex: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();

  const { area } = useSelector(state => ({
    area: findRootArea(state.areas.areas, areaId),
  }));

  if (!area) return null;
  return <Map area={area} />;
};

export default MapIndex;
