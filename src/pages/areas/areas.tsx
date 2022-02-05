import React from 'react';

import { LocationMarkerIcon, PlusIcon } from '@heroicons/react/outline';

import BottomContainer from 'components/bottomContainer';
import ContentContainerIndex from 'components/contentContainer';
import SideCardIndex from 'components/sideCard';

import { AreasProps } from './types';

const Areas: React.FC<AreasProps> = props => {
  const handleAreaEditClick = (id: string): void => {
    if (props.editingArea?.id === id) {
      props.onAreaEditEnd();
      return;
    }
    props.onAreaEditStart(id);
  };

  const handleMarkersShowClick = (id: string): void => {
    if (props.markerShowArea?.id === id) {
      props.onMarkersHide();
      return;
    }
    props.onMarkersShow(id);
  };

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
              className={`flex p-2${
                area.id === props.editingArea?.id ? ' bg-blue-50' : ''
              }`}
            >
              {area.name}
              <button
                type="button"
                className={`btn btn-xs h-6 w-6 p-1 ml-auto mr-1${
                  props.editingArea?.id === area.id ? ' btn-primary' : ''
                }`}
                onClick={() => handleAreaEditClick(area.id)}
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
