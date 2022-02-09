import React, { ChangeEvent, useState } from 'react';

import { FileInput } from 'components/input';
import ModalIndex from 'components/modal';

import { ImportModalProps } from './types';

const ImportModal: React.FC<ImportModalProps> = props => {
  const [state, setState] = useState<{ file?: File }>({ file: undefined });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setState(prevState => ({ ...prevState, file }));
  };

  const handleImport = (): void => {
    if (!state.file) return;

    const reader = new FileReader();
    reader.onload = readerEvent => {
      const result = readerEvent.target?.result;
      if (!result || typeof result !== 'string') return;

      try {
        const data = JSON.parse(result);
        props.onImport(data);
        // eslint-disable-next-line no-empty
      } catch {}
    };
    reader.readAsText(state.file);
  };
  return (
    <ModalIndex
      open={props.open}
      title="Importovat data"
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
          key="upload"
          type="button"
          className="btn btn-primary"
          onClick={handleImport}
        >
          Importovat
        </button>,
      ]}
    >
      <FileInput label="Soubor" onChange={changeHandler} />
    </ModalIndex>
  );
};

export default ImportModal;
