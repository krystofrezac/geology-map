import React, { ChangeEvent, useEffect, useState } from 'react';

import { ColorInput, TextInput } from 'components/input';
import ModalIndex from 'components/modal';

import { EditDepositModalProps } from './types';

const EditDepositModal: React.FC<EditDepositModalProps> = props => {
  const [state, setState] = useState({ name: '', color: '#000000' });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      name: props.deposit?.name || '',
      color: props.deposit?.color || '#000000',
    }));
  }, [props.deposit]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(s => ({ ...s, name: e.target.value }));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(s => ({ ...s, color: e.target.value }));
  };

  const handleAdd = (): void => {
    if (state.name.length === 0) return;

    props.onSubmit(state);
    setState(s => ({ ...s, name: '', color: '' }));
  };

  return (
    <ModalIndex
      open={props.open}
      title="Přidat naleziště"
      actions={[
        <button
          key="cancel"
          type="button"
          className="btn btn-outline"
          onClick={props.onClose}
        >
          Zrušit
        </button>,
        <button
          key="add"
          type="submit"
          className="btn btn-primary"
          onClick={handleAdd}
        >
          {`${props.deposit ? 'Upravit' : 'Přidat'} naleziště`}
        </button>,
      ]}
    >
      <TextInput label="Název" value={state.name} onChange={handleNameChange} />
      <ColorInput
        label="Barva"
        value={state.color}
        onChange={handleColorChange}
      />
    </ModalIndex>
  );
};

export default EditDepositModal;
