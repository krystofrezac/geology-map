import React from 'react';

import { PathLayer, Polygon } from 'react-mapycz';
import { Area } from 'store/slices/types/areas';

import { MapProps } from './types';

const getArea = (
  area: Area,
  highlight: boolean,
  transparent: boolean,
): JSX.Element => (
  <Polygon
    key={area.id}
    id={area.id}
    coords={area.coords}
    options={{
      color: area.color,
      opacity: transparent && !highlight ? 0.2 : 0.5,
      outlineColor: area.color,
      outlineOpacity: highlight ? 1 : 0,
    }}
  />
);

const Map: React.FC<MapProps> = props => {
  const somethingIsHighlighted = props.higlightArea !== undefined;

  const renderedAreas = props.areas.map(area => {
    const highlight = props.higlightArea === area.id;
    return [
      getArea(area, highlight, somethingIsHighlighted),
      ...area.extensions.map(ext =>
        getArea(
          { ...ext, color: area.color },
          highlight,
          somethingIsHighlighted,
        ),
      ),
    ];
  });

  return <PathLayer>{renderedAreas}</PathLayer>;
};

export default Map;
