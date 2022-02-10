import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import { findRootArea } from 'store/slices/areas';
import { closeDetailArea, openDetailArea } from 'store/slices/presentation';

import AreaList from './areaList';
import DetailModal from './detailModal';

const PresentationIndex: React.FC = () => {
  const { areas, detailArea } = useSelector(s => ({
    areas: s.areas.areas,
    detailArea: findRootArea(s.areas.areas, s.presentation.detailArea),
  }));
  const dispatch = useDispatch();

  const handleDetailOpen = (id: string): void => {
    dispatch(openDetailArea({ areaId: id }));
  };

  const handleDetailClose = (): void => {
    dispatch(closeDetailArea());
  };

  return (
    <>
      <AreaList areas={areas} onDetailOpen={handleDetailOpen} />
      <DetailModal area={detailArea} onClose={handleDetailClose} />
    </>
  );
};
export default PresentationIndex;
