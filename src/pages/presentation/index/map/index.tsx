import React from 'react';

import { useSelector } from 'store/hooks';

import Map from './map';

const MapIndex: React.FC = () => {
  const { areas, higlightArea, detailArea } = useSelector(state => ({
    areas: state.areas.areas,
    higlightArea: state.presentation.highlightArea,
    detailArea: state.presentation.detailArea,
  }));

  return <Map areas={areas} higlightArea={higlightArea || detailArea} />;
};

export default MapIndex;
