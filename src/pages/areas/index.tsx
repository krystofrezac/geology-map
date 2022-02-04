import React, { useState } from 'react';

import Map from 'components/map';

import ContentContainerIndex from '../../components/contentContainer';
import SideCardIndex from '../../components/sideCard';

import AddAreaModal from './addAreaModal';

const AreasIndex: React.FC = () => {
  const [state, setState] = useState({ addAreaModal: false });

  const handleAddAreaOpen = (): void => {
    setState(prevState => ({ ...prevState, addAreaModal: true }));
  };

  const handleAddAreaClose = (): void => {
    setState(prevState => ({ ...prevState, addAreaModal: false }));
  };

  return (
    <>
      <Map />
      <ContentContainerIndex>
        <AddAreaModal open={state.addAreaModal} onClose={handleAddAreaClose} />
        <SideCardIndex>
          <div className="flex">
            <h2 className="card-title">Oblasti</h2>
            <button
              type="button"
              className="btn btn-sm btn-primary ml-auto"
              onClick={handleAddAreaOpen}
            >
              Nová oblast
            </button>
          </div>
        </SideCardIndex>
      </ContentContainerIndex>
    </>
  );
};
export default AreasIndex;
