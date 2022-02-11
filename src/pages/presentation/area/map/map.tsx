import React from 'react';

import { Marker, MarkerLayer, PathLayer, Polygon } from 'react-mapycz';
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
  const somethingIsHighlighted = props.highlightDeposit !== undefined;

  const renderedDeposits = props.area.deposits.map(deposit => {
    const highlight = deposit.id === props.highlightDeposit?.id;

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

  const renderHighlightMarker = (): JSX.Element | null => {
    if (!props.highlightDeposit) return null;
    const [latSum, lngSum] = props.highlightDeposit.coords.reduce(
      ([prevLat, prevLng], curr) => [prevLat + curr.lat, prevLng + curr.lng],
      [0, 0],
    );
    const coordsLength = props.highlightDeposit.coords.length;
    const latAvg = latSum / coordsLength;
    const lngAvg = lngSum / coordsLength;

    return <Marker coords={{ lat: latAvg, lng: lngAvg }} />;
  };

  const renderedArea = [
    getArea(props.area),
    ...props.area.extensions.map(ext =>
      getArea({ ...ext, color: props.area.color }),
    ),
  ];

  return (
    <>
      <MarkerLayer>{renderHighlightMarker()}</MarkerLayer>
      <PathLayer>
        {renderedArea}
        {renderedDeposits}
      </PathLayer>
    </>
  );
};

export default Map;
