import React from 'react';

import ModalIndex from 'components/modal';

import { EditMarkerModalProps } from './types';

const EditMarkerModal: React.FC<EditMarkerModalProps> = props => (
  <ModalIndex
    open={props.open}
    title="Bod naleziště"
    actions={[
      <button
        key="cancel"
        type="button"
        className="btn bnt-secondary"
        onClick={props.onClose}
      >
        Zrušit
      </button>,
      <button
        key="delete"
        type="button"
        className="btn btn-secondary"
        onClick={props.onMarkerDelete}
      >
        Smazat
      </button>,
      <button
        key="move"
        type="button"
        className="btn btn-primary"
        onClick={props.onMarkerMove}
      >
        Přesunout
      </button>,
    ]}
  >
    <div>Zvolte akci kterou chcete s bodem provést</div>
  </ModalIndex>
);

export default EditMarkerModal;
