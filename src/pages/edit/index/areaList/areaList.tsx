import React from 'react';

import ContentContainerIndex from 'components/contentContainer';
import SideCardIndex, { SideCardTitle } from 'components/sideCard';

import AreaListItem from './areaListItem';
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
          <SideCardTitle>Oblasti</SideCardTitle>
          <button
            type="button"
            className="ml-auto btn btn-sm btn-primary"
            onClick={props.onAddAreaOpen}
          >
            Nová oblast
          </button>
        </div>
        {props.areas.map(area => [
          <AreaListItem
            key={area.id}
            area={area}
            editingCoords={props.editingAreaCoords?.id === area.id}
            markerShow={props.markerShowArea?.id === area.id}
            rootArea
            onAreaEditCoordsClick={() => handleAreaEditCoordsClick(area.id)}
            onMarkersShowClick={() => handleMarkersShowClick(area.id)}
            onAreaEdit={() => props.onAreaEdit(area.id)}
            onAreaDelete={() => props.onAreaDelete(area.id)}
          />,
          ...area.extensions.map((extension, index) => (
            <AreaListItem
              key={extension.id}
              area={{
                ...extension,
                color: area.color,
                name: `${area.name} #${index + 1}`,
              }}
              editingCoords={props.editingAreaCoords?.id === extension.id}
              markerShow={props.markerShowArea?.id === extension.id}
              rootArea={false}
              onAreaEditCoordsClick={() =>
                handleAreaEditCoordsClick(extension.id)
              }
              onMarkersShowClick={() => handleMarkersShowClick(extension.id)}
              onAreaEdit={() => props.onAreaEdit(extension.id)}
              onAreaDelete={() => props.onAreaDelete(extension.id)}
            />
          )),
        ])}
      </SideCardIndex>
    </ContentContainerIndex>
  );
};

export default AreaList;
