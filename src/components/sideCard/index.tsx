import React from 'react';

const SideCardIndex: React.FC = props => (
  <div className="p-4 m-8 ml-0 w-96 bg-white shadow-2xl card">
    {props.children}
  </div>
);

export const SideCardTitle: React.FC = props => (
  <h2 className="card-title">{props.children}</h2>
);

export default SideCardIndex;
