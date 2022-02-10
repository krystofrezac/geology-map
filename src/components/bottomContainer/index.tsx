import React from 'react';

const BottomContainer: React.FC = props => (
  <div className="flex fixed bottom-0 z-10 justify-center w-screen">
    {props.children}
  </div>
);

export default BottomContainer;
