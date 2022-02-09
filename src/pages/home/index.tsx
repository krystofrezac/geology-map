import React, { useState } from 'react';

import { useStore } from 'react-redux';
import { importData, resetData } from 'store/actions';
import { useDispatch } from 'store/hooks';

import { RootState } from '../../store/types';

import Home from './home';
import ImportModal from './importModal';
import ResetDataModal from './resetDataModal';

const HomeIndex: React.FC = () => {
  const [state, setState] = useState({
    resettingData: false,
    importing: false,
  });
  const store = useStore();

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

  const handleDataExport = (): void => {
    const data = JSON.stringify(store.getState());

    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.download = 'export.json';
    a.href = window.URL.createObjectURL(blob);
    a.click();
  };

  const handleDataImportStart = (): void => {
    setState(prevState => ({ ...prevState, importing: true }));
  };
  const handleDataImportCancel = (): void => {
    setState(prevState => ({ ...prevState, importing: false }));
  };

  const handleDataImport = (data: Record<string, any>): void => {
    dispatch(importData({ state: data as RootState }));
    handleDataImportCancel();
  };

  return (
    <>
      <Home
        onDataReset={handleStartDataResetting}
        onDataExport={handleDataExport}
        onDataImport={handleDataImportStart}
      />
      <ResetDataModal
        open={state.resettingData}
        onCancel={handleStopDataResetting}
        onReset={handleDataReset}
      />
      <ImportModal
        open={state.importing}
        onCancel={handleDataImportCancel}
        onImport={handleDataImport}
      />
    </>
  );
};

export default HomeIndex;
