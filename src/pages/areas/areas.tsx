import React from 'react';

import { LocationMarkerIcon, PlusIcon } from '@heroicons/react/outline';

import BottomContainer from 'components/bottomContainer';
import ContentContainerIndex from 'components/contentContainer';
import SideCardIndex from 'components/sideCard';

import { AreasProps } from './types';

const Areas: React.FC<AreasProps> = props => {
  return (
    <>
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
            <div
              key={area.id}
              className={`flex${
                area.id === props.editingArea?.id ? ' bg-blue-50' : ''
              }`}
            >
              {area.name}
              <PlusIcon
                className="h-4 h-4 ml-auto"
                onClick={() => props.onAreaEditStart(area.id)}
              />
              <LocationMarkerIcon
                className="h-4 w-4"
                onClick={() => props.onMarkersShow(area.id)}
              />
            </div>
          ))}
        </SideCardIndex>
      </ContentContainerIndex>
      {props.editingArea && (
        <BottomContainer>
          <div className="card bg-white shadow-2xl p-4 mb-4 flex flex-row items-center">
            <span className="text-lg pr-2">
              Mód vybírání bodů. Kliknutím na mapu vyberete bod.
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={props.onAreaEditEnd}
            >
              Zrušit
            </button>
          </div>
        </BottomContainer>
      )}
    </>
  );
};

export default Areas;
