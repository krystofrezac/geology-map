import React from 'react';

import { Marker, MarkerLayer, PathLayer, Polygon } from 'react-mapycz';
import { Area, Deposit } from 'store/slices/types/areas';

import { MapProps } from './types';

const getAreaPolygon = (area: Area): JSX.Element => (
  <Polygon
    key={area.id}
    coords={area.coords}
    options={{
      opacity: 0,
      outlineColor: area.color,
      outlineOpacity: 0.5,
    }}
  />
);
const getDepositPolygon = (
  deposit: Deposit,
  transparent: boolean = false,
): JSX.Element => (
  <Polygon
    key={deposit.id}
    coords={deposit.coords}
    options={{
      color: deposit.color,
      outlineColor: deposit.color,
      opacity: transparent ? 0.2 : 0.5,
      outlineOpacity: transparent ? 0 : 1,
    }}
  />
);

const Map: React.FC<MapProps> = props => {
  const drawAreaBorder = (): JSX.Element[] => [
    getAreaPolygon(props.area),
    ...props.area.extensions.map(extension =>
      getAreaPolygon({ ...extension, color: props.area.color }),
    ),
  ];

  const drawEditingDepositCoords = (): JSX.Element | undefined =>
    props.editingDepositCoords && getDepositPolygon(props.editingDepositCoords);

  const drawMarkerShowDeposit = (): JSX.Element | undefined =>
    props.markerShowDeposit && getDepositPolygon(props.markerShowDeposit);

  const drawDeposits = (): JSX.Element[] =>
    props.area.deposits
      .filter(
        deposit =>
          deposit.id !== props.editingDepositCoords?.id &&
          deposit.id !== props.markerShowDeposit?.id,
      )
      .map(deposit =>
        getDepositPolygon(
          deposit,
          props.editingDepositCoords !== undefined ||
            props.markerShowDeposit !== undefined,
        ),
      );

  const drawEditingDepositCoordsMarkers = (): undefined | JSX.Element => {
    if (
      props.editingDepositCoords === undefined ||
      props.editingDepositCoords.coords.length === 0
    )
      return undefined;

    return (
      <>
        <Marker coords={props.editingDepositCoords.coords[0]} />
        {props.editingDepositCoords.coords.length > 1 && (
          <Marker
            coords={
              props.editingDepositCoords.coords[
                props.editingDepositCoords.coords.length - 1
              ]
            }
          />
        )}
      </>
    );
  };

  const drawMarkersShowDepositMarkers = (): JSX.Element[] | undefined =>
    props.markerShowDeposit?.coords.map(coords => (
      <Marker key={`${coords.lat}-${coords.lng}`} coords={coords} />
    ));

  const renderedCenterMarkers = props.area.deposits.map(deposit => {
    const [latSum, lngSum] = deposit.coords.reduce(
      ([prevLat, prevLng], curr) => [prevLat + curr.lat, prevLng + curr.lng],
      [0, 0],
    );
    const coordsLength = deposit.coords.length;
    if (coordsLength < 3) return undefined;
    const latAvg = latSum / coordsLength;
    const lngAvg = lngSum / coordsLength;

    return <Marker coords={{ lat: latAvg, lng: lngAvg }} />;
  });

  return (
    <>
      <MarkerLayer>
        {renderedCenterMarkers}
        {drawEditingDepositCoordsMarkers()}
        {drawMarkersShowDepositMarkers()}
      </MarkerLayer>
      <PathLayer>
        {drawAreaBorder()}
        {drawEditingDepositCoords()}
        {drawMarkerShowDeposit()}
        {drawDeposits()}
      </PathLayer>
    </>
  );
};

export default Map;
