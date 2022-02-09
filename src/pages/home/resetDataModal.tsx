import React from 'react';

import ModalIndex from 'components/modal';

import { ResetDataModalProps } from './types';

const ResetDataModal: React.FC<ResetDataModalProps> = props => (
  <ModalIndex
    open={props.open}
    title="Doopravdy chcete resetovat data?"
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
        onClick={props.onReset}
      >
        Resetovat
      </button>,
    ]}
  >
    <div>Tato operace je nevratná</div>
  </ModalIndex>
);

export default ResetDataModal;
