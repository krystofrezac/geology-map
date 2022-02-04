import React from 'react';

import { ModalIndexProps } from './types';

const ModalIndex: React.FC<ModalIndexProps> = props => (
  <div className={`modal visible${props.open ? ' modal-open' : ''}`}>
    <div className="modal-box">
      {props.title && <h2>{props.title}</h2>}
      {props.children}

      {props.actions && <div className="modal-action">{props.actions}</div>}
    </div>
  </div>
);

export default ModalIndex;
