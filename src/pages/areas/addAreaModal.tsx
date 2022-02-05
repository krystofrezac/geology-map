import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'store/hooks';
import { addArea } from 'store/slices/areas';

import { TextInput } from 'components/input';
import ModalIndex from 'components/modal';

import { AddAreaModalProps } from './types';

const AddAreaModal: React.FC<AddAreaModalProps> = props => {
  const [state, setState] = useState({ name: '' });
  const dispatch = useDispatch();

  const handleClose = (): void => {
    props.onClose();
  };

  const handleAdd = (): void => {
    if (state.name.length === 0) return;

    dispatch(addArea({ name: state.name }));
    setState(prevState => ({ ...prevState, name: '' }));
    props.onClose();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(prevState => ({ ...prevState, name: e.target.value }));
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
        <button
          key="add"
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
        >
          Přidat oblast
        </button>,
      ]}
    >
      <TextInput
        label="Název oblasti"
        value={state.name}
        onChange={handleNameChange}
      />
    </ModalIndex>
  );
};

export default AddAreaModal;
