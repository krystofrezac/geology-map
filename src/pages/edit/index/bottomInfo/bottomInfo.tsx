import React from 'react';

import BottomContainer from 'components/bottomContainer';

import { BottomInfoProps } from './types';

const BottomInfo: React.FC<BottomInfoProps> = props => {
  if (props.editingAreaCoords) {
    return (
      <BottomContainer>
        <div className="flex flex-row items-center p-4 mb-4 bg-white shadow-2xl card">
          <span className="pr-2 text-lg">Kliknutím na mapu přídáte bod</span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.onAreaEditCoordsEnd}
          >
            Zrušit
          </button>
        </div>
      </BottomContainer>
    );
  }
  if (props.movingCoords)
    return (
      <BottomContainer>
        <div className="flex flex-row items-center p-4 mb-4 bg-white shadow-2xl card">
          <span className="pr-2 text-lg">
            Klikněte na pozici na mapě, kam chcete bod přemístit
          </span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.onMarkerMoveCancel}
          >
            Zrušit
          </button>
        </div>
      </BottomContainer>
    );
  if (props.markerShowArea)
    return (
      <BottomContainer>
        <div className="flex flex-row items-center p-4 mb-4 bg-white shadow-2xl card">
          <span className="pr-2 text-lg">
            Kliknutím na bod ho můžete upravit
          </span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.onHideAreaMarkers}
          >
            Zrušit
          </button>
        </div>
      </BottomContainer>
    );

  return null;
};

export default BottomInfo;
