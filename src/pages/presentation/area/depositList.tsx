import React from 'react';

import { ChevronLeftIcon, DocumentTextIcon } from '@heroicons/react/outline';
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
        <Link to="/presentation">
          <IconButtonIndex className="mr-2">
            <ChevronLeftIcon />
          </IconButtonIndex>
        </Link>
        <SideCardTitle>{props.area.name}</SideCardTitle>
      </div>
      {props.area.deposits.map(deposit => (
        <div
          key={deposit.id}
          className="flex gap-1 py-2"
          onMouseEnter={() => props.onStartHighlight(deposit.id)}
          onMouseLeave={props.onStopHighlight}
        >
          <div className="flex flex-row items-center">
            <ColorDotIndex color={deposit.color} />
            <span className="pl-2"> {deposit.name}</span>
          </div>
          <IconButtonIndex
            className="ml-auto btn-primary"
            onClick={() => props.onDetailOpen(deposit.id)}
          >
            <DocumentTextIcon />
          </IconButtonIndex>
        </div>
      ))}
    </SideCardIndex>
  </ContentContainerIndex>
);
export default DepositList;
