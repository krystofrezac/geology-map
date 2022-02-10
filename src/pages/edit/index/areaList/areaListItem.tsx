import React from 'react';

import {
  ChevronDownIcon,
  ChevronUpIcon,
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
  <div className="flex gap-1 py-2">
    <div className="flex flex-row gap-2 items-center">
      <div className="flex flex-col">
        <button
          type="button"
          className="w-3 h-3 hover:bg-slate-200 rounded transition-colors"
        >
          {props.rootArea && <ChevronUpIcon onClick={props.onAreaMoveUp} />}
        </button>
        <button
          type="button"
          className="w-3 h-3 hover:bg-slate-200 rounded transition-colors"
        >
          {props.rootArea && <ChevronDownIcon onClick={props.onAreaMoveDown} />}
        </button>
      </div>
      <ColorDotIndex color={props.area.color} />
      <span> {props.area.name}</span>
    </div>
    <IconButtonIndex
      className="ml-auto btn-error"
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
