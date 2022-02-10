import React from 'react';

import {
  ChevronLeftIcon,
  LocationMarkerIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import ColorDotIndex from 'components/bottomContainer/colorDot';
import ContentContainerIndex from 'components/contentContainer';
import IconButtonIndex from 'components/iconButton';
import SideCardIndex, { SideCardTitle } from 'components/sideCard';

import { DepositListProps } from './types';

const DepositList: React.FC<DepositListProps> = props => (
  <ContentContainerIndex>
    <SideCardIndex>
      <div className="flex flex-row align-center">
        <Link to="/edit">
          <IconButtonIndex className="mr-2">
            <ChevronLeftIcon />
          </IconButtonIndex>
        </Link>
        <SideCardTitle>{props.area.name}</SideCardTitle>
        <button
          type="button"
          className="ml-auto btn btn-primary btn-sm"
          onClick={props.onDepositAdd}
        >
          Nové naleziště
        </button>
      </div>
      <div />
      {props.area.deposits.map(deposit => (
        <div key={deposit.id} className="flex flex-row gap-1 items-center py-2">
          <ColorDotIndex color={deposit.color} />
          <span className="pl-1"> {deposit.name}</span>

          <IconButtonIndex
            className="ml-auto btn-error"
            onClick={() => props.onDepositDelete(deposit.id)}
          >
            <TrashIcon />
          </IconButtonIndex>
          <IconButtonIndex
            className="btn-info"
            onClick={() => props.onDepositEdit(deposit.id)}
          >
            <PencilIcon />
          </IconButtonIndex>
          <IconButtonIndex
            className={
              props.editingDepositCoords === deposit.id ? 'btn-primary' : ''
            }
            onClick={() => props.onDepositCoordsEdit(deposit.id)}
          >
            <PlusIcon />
          </IconButtonIndex>
          <IconButtonIndex
            className={
              props.markersShowDeposit === deposit.id ? 'btn-primary' : ''
            }
            onClick={() => props.onDepositMarkersShow(deposit.id)}
          >
            <LocationMarkerIcon />
          </IconButtonIndex>
        </div>
      ))}
    </SideCardIndex>
  </ContentContainerIndex>
);

export default DepositList;
