import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { findRootArea } from 'store/slices/areas';

import DepositListIndex from './depositList';
import EditDepositModalIndex from './editDepositModal';
import MapIndex from './map';

const AreaIndex: React.FC = () => {
  const params = useParams<{ areaId: string }>();
  const { areaId } = params;

  const { area } = useSelector(state => ({
    area: findRootArea(state.areas.areas, areaId),
  }));

  if (!area) return <div>Tato oblast neexistuje</div>;

  return (
    <>
      <MapIndex area={area} />
      <DepositListIndex area={area} />
      <EditDepositModalIndex area={area} />
    </>
  );
};

export default AreaIndex;
