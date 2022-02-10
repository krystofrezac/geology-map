import React from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'store/hooks';
import { findDeposit, findRootArea } from 'store/slices/areas';
import {
  closeDetailDeposit,
  openDetailDeposit,
  startHighlightDeposit,
  stopHighlightDeposit,
} from 'store/slices/presentation';

import DepositList from './depositList';
import DetailModal from './detailModal';

const AreaIndex: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const dispatch = useDispatch();

  const { area, detailDeposit } = useSelector(state => {
    const ar = findRootArea(state.areas.areas, areaId);
    return {
      area: ar,
      detailDeposit: ar
        ? findDeposit(ar, state.presentation.detailDeposit)
        : undefined,
    };
  });

  const handleDetailOpen = (id: string): void => {
    dispatch(openDetailDeposit({ depositId: id }));
  };

  const handleDetailClose = (): void => {
    dispatch(closeDetailDeposit());
  };

  const handleStartHighlightDeposit = (id: string): void => {
    dispatch(startHighlightDeposit({ depositId: id }));
  };

  const handleStopHighlightDeposit = (): void => {
    dispatch(stopHighlightDeposit());
  };

  if (!area) return null;

  return (
    <>
      <DepositList
        area={area}
        onDetailOpen={handleDetailOpen}
        onStartHighlight={handleStartHighlightDeposit}
        onStopHighlight={handleStopHighlightDeposit}
      />
      <DetailModal deposit={detailDeposit} onClose={handleDetailClose} />
    </>
  );
};

export default AreaIndex;
