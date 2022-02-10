import React from 'react';

import {
  DownloadIcon,
  ExclamationIcon,
  PencilIcon,
  PresentationChartBarIcon,
  RefreshIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import BottomContainer from 'components/bottomContainer';

import { HomeProps } from './types';

const Home: React.FC<HomeProps> = props => (
  <>
    <div className="flex flex-col justify-center h-screen">
      <div className="flex gap-4 justify-center">
        <Link to="/">
          <button type="button" className="btn btn-primary btn-lg">
            <PresentationChartBarIcon className="mr-2 w-6 h-6" />
            Prezentace
          </button>
        </Link>
        <Link to="/edit">
          <button type="button" className="btn btn-secondary btn-lg">
            <PencilIcon className="mr-2 w-6 h-6" />
            Editace
          </button>
        </Link>
      </div>
      <div className="flex gap-4 justify-center pt-8">
        <button type="button" className="btn" onClick={props.onDataExport}>
          <DownloadIcon className="mr-2 w-6 h-6" />
          Exportovat data
        </button>
        <button type="button" className="btn" onClick={props.onDataImport}>
          <UploadIcon className="mr-2 w-6 h-6" />
          Importovat data
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={props.onDataReset}
        >
          <RefreshIcon className="mr-2 w-6 h-6" />
          Resetovat data
        </button>
      </div>
    </div>
    <BottomContainer>
      <div className="px-8 pb-8">
        <div className="alert alert-error">
          <div className="flex-1">
            <ExclamationIcon className="w-6 h-6" />
            <span className="mx-3">
              Pokud aplikace nefunguje (nezobrazují se data nebo se zobrazuje
              pouze bíla obrazovka) jsou data nejspíše poškozená. Pro opravu
              resetujte data.
            </span>
          </div>
        </div>
      </div>
    </BottomContainer>
  </>
);

export default Home;
