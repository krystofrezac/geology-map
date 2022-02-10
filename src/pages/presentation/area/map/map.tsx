import React from 'react';

import { PathLayer, Polygon } from 'react-mapycz';
import { Area } from 'store/slices/types/areas';

import { MapProps } from './types';

const getArea = (area: Area): JSX.Element => (
  <Polygon
    key={area.id}
    id={area.id}
    coords={area.coords}
    options={{
      opacity: 0,
      outlineColor: area.color,
      outlineOpacity: 0.5,
    }}
  />
);

const Map: React.FC<MapProps> = props => {
  const somethingIsHighlighted = props.higlightDeposit !== undefined;

  const renderedDeposits = props.area.deposits.map(deposit => {
    const highlight = deposit.id === props.higlightDeposit;

    return (
      <Polygon
        id={deposit.id}
        key={deposit.id}
        coords={deposit.coords}
        options={{
          color: deposit.color,
          opacity: somethingIsHighlighted && !highlight ? 0.2 : 0.5,
          outlineColor: deposit.color,
          outlineOpacity: highlight ? 1 : 0,
        }}
      />
    );
  });

  const renderedArea = [
    getArea(props.area),
    ...props.area.extensions.map(ext =>
      getArea({ ...ext, color: props.area.color }),
    ),
  ];

  return (
    <PathLayer>
      {renderedArea}
      {renderedDeposits}
    </PathLayer>
  );
};

export default Map;
