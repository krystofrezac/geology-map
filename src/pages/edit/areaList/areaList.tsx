import React from 'react';

import {
  LocationMarkerIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';

import ColorDotIndex from 'components/bottomContainer/colorDot';
import ContentContainerIndex from 'components/contentContainer';
import SideCardIndex from 'components/sideCard';

import { AreaListProps } from './types';

const AreaList: React.FC<AreaListProps> = props => {
  const handleAreaEditCoordsClick = (id: string): void => {
    if (props.editingAreaCoords?.id === id) {
      props.onAreaEditCoordsEnd();
      return;
    }
    props.onAreaEditCoordsStart(id);
  };

  const handleMarkersShowClick = (id: string): void => {
    if (props.markerShowArea?.id === id) {
      props.onMarkersHide();
      return;
    }
    props.onMarkersShow(id);
  };

  return (
    <ContentContainerIndex>
      <SideCardIndex>
        <div className="flex">
          <h2 className="card-title">Oblasti</h2>
          <button
            type="button"
            className="btn btn-sm btn-primary ml-auto"
            onClick={props.onAddAreaOpen}
          >
            Nová oblast
          </button>
        </div>
        {props.areas.map(area => (
          <div key={area.id} className="flex p-2">
            <div className="flex flex-row items-center">
              <ColorDotIndex color={area.color} />
              <span className="pl-2"> {area.name}</span>
            </div>
            <button
              type="button"
              className="btn btn-xs btn-error h-6 w-6 p-1 ml-auto mr-1"
              onClick={() => props.onAreaDelete(area.id)}
            >
              <TrashIcon />
            </button>
            <button
              type="button"
              className="btn btn-xs btn-info h-6 w-6 p-1 mr-1"
              onClick={() => props.onAreaEdit(area.id)}
            >
              <PencilIcon />
            </button>
            <button
              type="button"
              className={`btn btn-xs h-6 w-6 p-1 mr-1${
                props.editingAreaCoords?.id === area.id ? ' btn-primary' : ''
              }`}
              onClick={() => handleAreaEditCoordsClick(area.id)}
            >
              <PlusIcon />
            </button>
            <button
              type="button"
              className={`btn btn-xs h-6 w-6 p-1${
                props.markerShowArea?.id === area.id ? ' btn-primary' : ''
              }`}
              onClick={() => handleMarkersShowClick(area.id)}
            >
              <LocationMarkerIcon />
            </button>
          </div>
        ))}
      </SideCardIndex>
    </ContentContainerIndex>
  );
};

export default AreaList;
