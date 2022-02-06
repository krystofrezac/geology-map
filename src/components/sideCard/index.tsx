import React from 'react';

const SideCardIndex: React.FC = props => (
  <div className="card bg-white shadow-2xl p-4 m-8 w-96">{props.children}</div>
);

export const SideCardTitle: React.FC = props => (
  <h2 className="card-title">{props.children}</h2>
);

export default SideCardIndex;
