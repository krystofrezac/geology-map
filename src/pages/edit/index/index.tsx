import React from 'react';

import AreaListIndex from './areaList';
import BottomInfoIndex from './bottomInfo';
import EditAreaModalIndex from './editAreaModal';
import EditMarkerModalIndex from './editMarkerModal';

const EditIndex: React.FC = () => {
  return (
    <>
      <EditAreaModalIndex />
      <EditMarkerModalIndex />
      <AreaListIndex />
      <BottomInfoIndex />
    </>
  );
};
export default EditIndex;
