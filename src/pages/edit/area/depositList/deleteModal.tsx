import React from 'react';

import ModalIndex from 'components/modal';

import { DeleteModalProps } from './types';

const DeleteModal: React.FC<DeleteModalProps> = props => (
  <ModalIndex
    open={props.deposit !== undefined}
    title={`Doopravdy chcete odstranit naleziště '${props.deposit?.name}'`}
    actions={[
      <button
        key="cancel"
        type="button"
        className="btn btn-outline"
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

export default DeleteModal;
