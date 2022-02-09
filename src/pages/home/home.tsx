import React from 'react';

import {
  ExclamationIcon,
  PencilIcon,
  PresentationChartBarIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import BottomContainer from 'components/bottomContainer';

import { HomeProps } from './types';

const Home: React.FC<HomeProps> = props => (
  <>
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center gap-4">
        <Link to="/">
          <button type="button" className="btn btn-primary btn-lg">
            <PresentationChartBarIcon className="h-6 w-6 mr-2" />
            Prezentace
          </button>
        </Link>
        <Link to="/edit">
          <button type="button" className="btn btn-secondary btn-lg">
            <PencilIcon className="h-6 w-6 mr-2" />
            Editace
          </button>
        </Link>
      </div>
      <div className="flex justify-center pt-8">
        <button
          type="button"
          className="btn btn-warning"
          onClick={props.onDataReset}
        >
          <RefreshIcon className="h-6 w-6 mr-2" />
          Resetovat data
        </button>
      </div>
    </div>
    <BottomContainer>
      <div className="pb-8">
        <div className="alert alert-error">
          <div className="flex-1">
            <ExclamationIcon className="h-6 w-6" />
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
