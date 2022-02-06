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
          className="btn btn-primary btn-sm ml-auto"
          onClick={props.onAddDeposit}
        >
          Nové naleziště
        </button>
      </div>
      <div />
      {props.area.deposits.map(deposit => (
        <div className="flex flex-row gap-1 items-center py-2">
          <ColorDotIndex color={deposit.color} />
          <span className="pl-1"> {deposit.name}</span>

          <IconButtonIndex className="btn-error ml-auto">
            <TrashIcon />
          </IconButtonIndex>
          <IconButtonIndex
            className="btn-info"
            onClick={() => props.onEditDeposit(deposit.id)}
          >
            <PencilIcon />
          </IconButtonIndex>
          <IconButtonIndex>
            <PlusIcon />
          </IconButtonIndex>
          <IconButtonIndex>
            <LocationMarkerIcon />
          </IconButtonIndex>
        </div>
      ))}
    </SideCardIndex>
  </ContentContainerIndex>
);

export default DepositList;
