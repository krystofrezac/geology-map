import React from 'react';

import BottomContainer from 'components/bottomContainer';

import { BottomInfoProps } from './types';

const BottomInfo: React.FC<BottomInfoProps> = props => {
  if (props.editingAreaCoords) {
    return (
      <BottomContainer>
        <div className="card bg-white shadow-2xl p-4 mb-4 flex flex-row items-center">
          <span className="text-lg pr-2">Kliknutím na mapu přídáte bod</span>
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
        <div className="card bg-white shadow-2xl p-4 mb-4 flex flex-row items-center">
          <span className="text-lg pr-2">
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
        <div className="card bg-white shadow-2xl p-4 mb-4 flex flex-row items-center">
          <span className="text-lg pr-2">
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
