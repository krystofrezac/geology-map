import React from 'react';

import {
  LocationMarkerIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';

import ColorDotIndex from 'components/bottomContainer/colorDot';

import { AreaListItemProps } from './types';

const AreaListItem: React.FC<AreaListItemProps> = props => (
  <div className="flex p-2">
    <div className="flex flex-row items-center">
      <ColorDotIndex color={props.area.color} />
      <span className="pl-2"> {props.area.name}</span>
    </div>
    <button
      type="button"
      className="btn btn-xs btn-error h-6 w-6 p-1 ml-auto mr-1"
      onClick={() => props.onAreaDelete()}
    >
      <TrashIcon />
    </button>
    <button
      type="button"
      className="btn btn-xs btn-info h-6 w-6 p-1 mr-1"
      onClick={() => props.onAreaEdit()}
    >
      <PencilIcon />
    </button>
    <button
      type="button"
      className={`btn btn-xs h-6 w-6 p-1 mr-1${
        props.editingCoords ? ' btn-primary' : ''
      }`}
      onClick={() => props.onAreaEditCoordsClick()}
    >
      <PlusIcon />
    </button>
    <button
      type="button"
      className={`btn btn-xs h-6 w-6 p-1${
        props.markerShow ? ' btn-primary' : ''
      }`}
      onClick={() => props.onMarkersShowClick()}
    >
      <LocationMarkerIcon />
    </button>
  </div>
);
export default AreaListItem;
