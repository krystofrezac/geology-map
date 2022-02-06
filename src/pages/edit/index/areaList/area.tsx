import React from 'react';

import {
  EyeIcon,
  LocationMarkerIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import ColorDotIndex from 'components/bottomContainer/colorDot';
import IconButtonIndex from 'components/iconButton';

import { AreaListItemProps } from './types';

const AreaListItem: React.FC<AreaListItemProps> = props => (
  <div className="flex py-2 gap-1">
    <div className="flex flex-row items-center">
      <ColorDotIndex color={props.area.color} />
      <span className="pl-2"> {props.area.name}</span>
    </div>
    <IconButtonIndex
      className="btn-error ml-auto"
      onClick={() => props.onAreaDelete()}
    >
      <TrashIcon />
    </IconButtonIndex>
    <IconButtonIndex className="btn-info" onClick={() => props.onAreaEdit()}>
      <PencilIcon />
    </IconButtonIndex>
    <IconButtonIndex
      className={props.editingCoords ? ' btn-primary' : ''}
      onClick={() => props.onAreaEditCoordsClick()}
    >
      <PlusIcon />
    </IconButtonIndex>
    <IconButtonIndex
      className={props.markerShow ? 'btn-primary' : ''}
      onClick={() => props.onMarkersShowClick()}
    >
      <LocationMarkerIcon />
    </IconButtonIndex>
    <Link to={`/edit/area/${props.area.id}`}>
      <IconButtonIndex
        className={props.rootArea ? 'btn-success' : 'btn-disabled'}
      >
        <EyeIcon />
      </IconButtonIndex>
    </Link>
  </div>
);
export default AreaListItem;
