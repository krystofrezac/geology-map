import React from 'react';

import AreaListIndex from './areaList';
import BottomInfoIndex from './bottomInfo';
import EditAreaModalIndex from './editAreaModal';
import EditMarkerModalIndex from './editMarkerModal';
import MapIndex from './map';

const EditIndex: React.FC = () => {
  return (
    <>
      <MapIndex />
      <EditAreaModalIndex />
      <EditMarkerModalIndex />
      <AreaListIndex />
      <BottomInfoIndex />
    </>
  );
};
export default EditIndex;
