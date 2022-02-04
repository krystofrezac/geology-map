import React from 'react';

import { TextInput } from 'components/input';
import ModalIndex from 'components/modal';

import { AddAreaModalProps } from './types';

const AddAreaModal: React.FC<AddAreaModalProps> = props => {
  const handleClose = (): void => {
    props.onClose();
  };

  return (
    <ModalIndex
      open={props.open}
      title="Přidat oblast"
      actions={[
        <button
          key="cancel"
          type="button"
          className="btn btn-outline"
          onClick={handleClose}
        >
          Zrušit
        </button>,
        <button key="add" type="button" className="btn btn-primary">
          Přidat oblast
        </button>,
      ]}
    >
      <TextInput label="Název oblasti" />
    </ModalIndex>
  );
};

export default AddAreaModal;
