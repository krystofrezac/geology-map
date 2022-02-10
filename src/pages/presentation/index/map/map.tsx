import React from 'react';

import { PathLayer, Polygon } from 'react-mapycz';
import { Area } from 'store/slices/types/areas';

import { MapProps } from './types';

const getArea = (area: Area): JSX.Element => (
  <Polygon
    key={area.id}
    id={area.id}
    coords={area.coords}
    options={{ color: area.color, opacity: 0.5, outlineOpacity: 0 }}
  />
);

const Map: React.FC<MapProps> = props => {
  const renderedAreas = props.areas.map(area => [
    getArea(area),
    ...area.extensions.map(ext => getArea({ ...ext, color: area.color })),
  ]);

  return <PathLayer>{renderedAreas}</PathLayer>;
};

export default Map;
