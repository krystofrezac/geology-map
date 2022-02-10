import React from 'react';

const ContentContainerIndex: React.FC = props => (
  <div className="flex fixed top-0 right-0 z-10 justify-end h-screen">
    {props.children}
  </div>
);

export default ContentContainerIndex;
