import React, { useEffect, useState } from 'react';

import { Area } from 'store/slices/types/areas';

import ModalIndex from 'components/modal';

import { DeleteModalProps } from './types';

const DeleteModal: React.FC<DeleteModalProps> = props => {
  const [state, setState] = useState<{
    area: Area | undefined;
    open: boolean;
  }>({ area: undefined, open: false });

  // persist last area so when modal is closing there is not undefined in text
  useEffect(() => {
    if (!props.area) {
      setState(prevState => ({ ...prevState, open: false }));
      return;
    }
    setState(prevState => ({ ...prevState, area: props.area, open: true }));
  }, [props.area]);

  return (
    <ModalIndex
      open={state.open}
      title={`Doopravdy chcete odstranit oblast '${state.area?.name}'`}
      actions={[
        <button
          key="cancel"
          type="button"
          className="btn"
          onClick={props.onCancel}
        >
          Zrušit
        </button>,
        <button
          key="delete"
          type="button"
          className="btn btn-error"
          onClick={props.onDelete}
        >
          Odstranit
        </button>,
      ]}
    />
  );
};

export default DeleteModal;
