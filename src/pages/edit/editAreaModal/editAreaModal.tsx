import React, { ChangeEvent, useEffect, useState } from 'react';

import { ColorInput, TextInput } from 'components/input';
import ModalIndex from 'components/modal';

import { EditAreaModalProps } from './types';

const EditAreaModal: React.FC<EditAreaModalProps> = props => {
  const [state, setState] = useState({ name: '', color: '#000000' });

  useEffect(() => {
    const { area } = props;
    if (!area) return;

    setState(prevState => ({
      ...prevState,
      name: area.name,
      color: area.color,
    }));
  }, [props.area]);

  const handleClose = (): void => {
    props.onClose();
  };

  const handleAdd = (): void => {
    if (state.name.length === 0) return;

    props.onAreaEdit(state);
    setState(prevState => ({ ...prevState, name: '', color: '#000000' }));
    props.onClose();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(prevState => ({ ...prevState, name: e.target.value }));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(prevState => ({ ...prevState, color: e.target.value }));
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
          {props.area ? 'Upravit oblast' : 'Přidat oblast'}
        </button>,
      ]}
    >
      <TextInput
        label="Název oblasti"
        value={state.name}
        onChange={handleNameChange}
      />
      <ColorInput
        label="Barva"
        value={state.color}
        onChange={handleColorChange}
      />
    </ModalIndex>
  );
};

export default EditAreaModal;
