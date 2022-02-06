import React, { useEffect, useState } from 'react';

import { useSelector } from 'store/hooks';
import { findAreaParent } from 'store/slices/areas';
import { Area } from 'store/slices/types/areas';

import ModalIndex from 'components/modal';

import { DeleteModalProps } from './types';

const DeleteModal: React.FC<DeleteModalProps> = props => {
  const [state, setState] = useState<{
    area: Area | undefined;
    open: boolean;
  }>({ area: undefined, open: false });

  const { areaParent } = useSelector(s => ({
    areaParent: findAreaParent(s.areas.areas, props.area?.id),
  }));

  // persist last area so when modal is closing there is not undefined in text
  useEffect(() => {
    if (!props.area) {
      setState(prevState => ({ ...prevState, open: false }));
      return;
    }
    setState(prevState => ({ ...prevState, area: props.area, open: true }));
  }, [props.area]);

  let areaName = state.area?.name;
  if (areaParent) {
    const extensionIndex = areaParent.extensions.findIndex(
      e => e.id === props.area?.id,
    );
    areaName = `${areaParent.name} #${extensionIndex + 1}`;
  }
  return (
    <ModalIndex
      open={state.open}
      title={`Doopravdy chcete odstranit oblast '${areaName}'`}
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
