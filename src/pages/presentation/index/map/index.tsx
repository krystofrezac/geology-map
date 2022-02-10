import React from 'react';

import { useSelector } from 'store/hooks';

import Map from './map';

const MapIndex: React.FC = () => {
  const { areas } = useSelector(state => ({ areas: state.areas.areas }));

  return <Map areas={areas} />;
};

export default MapIndex;
