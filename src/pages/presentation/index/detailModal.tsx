import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import MarkdownPreview from 'components/markdown';
import ModalIndex from 'components/modal';

import { DetailModalProps, DetailModalState } from './types';

const DetailModal: React.FC<DetailModalProps> = props => {
  const [state, setState] = useState<DetailModalState>({
    open: false,
    area: undefined,
  });
  useEffect(() => {
    if (props.area) {
      setState(prevState => ({ ...prevState, open: true, area: props.area }));
      return;
    }

    setState(prevState => ({ ...prevState, open: false }));
  }, [props.area]);
  return (
    <ModalIndex
      open={state.open}
      title={state.area?.name}
      actions={[
        <button
          key="cancel"
          type="button"
          className="btn btn-outline"
          onClick={props.onClose}
        >
          Zavřít
        </button>,
        <Link key="showDeposits" to={`/presentation/area/${state.area?.id}`}>
          <button type="button" className="btn btn-primary">
            Zobrazit naleziště
          </button>
        </Link>,
      ]}
    >
      <div className="pt-4">
        <MarkdownPreview source={state.area?.description || ''} />
      </div>
    </ModalIndex>
  );
};
export default DetailModal;
