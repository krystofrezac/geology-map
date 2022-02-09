import React, { useState } from 'react';

import resetData from 'store/actions/reset';
import { useDispatch } from 'store/hooks';

import Home from './home';
import ResetDataModal from './resetDataModal';

const HomeIndex: React.FC = () => {
  const [state, setState] = useState({ resettingData: false });

  const dispatch = useDispatch();

  const handleStartDataResetting = (): void => {
    setState(prevState => ({ ...prevState, resettingData: true }));
  };

  const handleStopDataResetting = (): void => {
    setState(prevState => ({ ...prevState, resettingData: false }));
  };

  const handleDataReset = (): void => {
    dispatch(resetData());
    handleStopDataResetting();
  };

  return (
    <>
      <Home onDataReset={handleStartDataResetting} />
      <ResetDataModal
        open={state.resettingData}
        onCancel={handleStopDataResetting}
        onReset={handleDataReset}
      />
    </>
  );
};

export default HomeIndex;
