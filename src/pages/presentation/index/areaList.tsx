import React from 'react';

import { DocumentTextIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import ColorDotIndex from 'components/bottomContainer/colorDot';
import ContentContainerIndex from 'components/contentContainer';
import IconButtonIndex from 'components/iconButton';
import SideCardIndex, { SideCardTitle } from 'components/sideCard';

import { AreaListProps } from './types';

const AreaList: React.FC<AreaListProps> = props => (
  <ContentContainerIndex>
    <SideCardIndex>
      <SideCardTitle>Oblasti</SideCardTitle>
      {props.areas.map(area => (
        <div
          key={area.id}
          className="flex gap-1 py-2"
          onMouseEnter={() => props.onStartHighlight(area.id)}
          onMouseLeave={props.onStopHighlight}
        >
          <div className="flex flex-row items-center">
            <ColorDotIndex color={area.color} />
            <span className="pl-2"> {area.name}</span>
          </div>
          <IconButtonIndex
            className="ml-auto btn-primary"
            onClick={() => props.onDetailOpen(area.id)}
          >
            <DocumentTextIcon />
          </IconButtonIndex>
          <Link to={`/presentation/area/${area.id}`}>
            <IconButtonIndex className="btn-secondary">
              <LocationMarkerIcon />
            </IconButtonIndex>
          </Link>
        </div>
      ))}
    </SideCardIndex>
  </ContentContainerIndex>
);
export default AreaList;
