import React, { ChangeEvent, useEffect, useState } from 'react';

import { ColorInput, SelectInput, TextInput } from 'components/input';
import ModalIndex from 'components/modal';

import { EditAreaModalProps, EditAreaModalState } from './types';

const EXTEND_NOTHING = '__nothing__';
const EditAreaModal: React.FC<EditAreaModalProps> = props => {
  const [state, setState] = useState<EditAreaModalState>({
    name: '',
    color: '#000000',
    extend: undefined,
  });

  useEffect(() => {
    const { area } = props;

    setState(prevState => ({
      ...prevState,
      name: area?.name || '',
      color: area?.color || '#000000',
      extend: props.extend,
    }));
  }, [props.area]);

  const handleClose = (): void => {
    props.onClose();
  };

  const handleAdd = (): void => {
    if (!state.extend && state.name.length === 0) return;

    props.onAreaEdit(state);
    setState(prevState => ({
      ...prevState,
      name: '',
      color: '#000000',
      extend: undefined,
    }));
    props.onClose();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(prevState => ({ ...prevState, name: e.target.value }));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(prevState => ({ ...prevState, color: e.target.value }));
  };

  const handleExtendChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setState(prevState => ({
      ...prevState,
      extend: value === EXTEND_NOTHING ? undefined : value,
    }));
  };

  const extendOptions = [
    { value: EXTEND_NOTHING, label: 'Žádnou' },
    ...props.areas
      .filter(area => area.id !== props.area?.id)
      .map(area => ({ value: area.id, label: area.name })),
  ];

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
          type="submit"
          className="btn btn-primary"
          onClick={handleAdd}
        >
          {props.area ? 'Upravit oblast' : 'Přidat oblast'}
        </button>,
      ]}
    >
      <SelectInput
        label="Rozšířit již existující oblast"
        options={extendOptions}
        onChange={handleExtendChange}
        value={state.extend === undefined ? EXTEND_NOTHING : state.extend}
      />
      <TextInput
        label="Název oblasti"
        value={state.name}
        disabled={state.extend !== undefined}
        onChange={handleNameChange}
      />
      <ColorInput
        label="Barva"
        value={state.color}
        disabled={state.extend !== undefined}
        onChange={handleColorChange}
      />
    </ModalIndex>
  );
};

export default EditAreaModal;
