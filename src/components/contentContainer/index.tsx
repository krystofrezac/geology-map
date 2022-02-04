import React from 'react';

const ContentContainerIndex: React.FC = props => (
  <div className="fixed top-0 right-0 flex justify-end h-screen z-10">
    {props.children}
  </div>
);

export default ContentContainerIndex;
