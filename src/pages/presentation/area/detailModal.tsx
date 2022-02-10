import React, { useEffect, useState } from 'react';

import MarkdownPreview from 'components/markdown';
import ModalIndex from 'components/modal';

import { DetailModalProps, DetailModalState } from './types';

const DetailModal: React.FC<DetailModalProps> = props => {
  const [state, setState] = useState<DetailModalState>({
    open: false,
    deposit: undefined,
  });

  useEffect(() => {
    if (props.deposit) {
      setState(prevState => ({
        ...prevState,
        open: true,
        deposit: props.deposit,
      }));
      return;
    }
    setState(prevState => ({ ...prevState, open: false }));
  }, [props.deposit]);

  return (
    <ModalIndex
      open={state.open}
      title={state.deposit?.name}
      actions={[
        <button
          key="cancel"
          type="button"
          className="btn btn-outline"
          onClick={props.onClose}
        >
          Zavřít
        </button>,
      ]}
    >
      <div className="pt-4">
        <MarkdownPreview source={state.deposit?.description || ''} />
      </div>
    </ModalIndex>
  );
};

export default DetailModal;
