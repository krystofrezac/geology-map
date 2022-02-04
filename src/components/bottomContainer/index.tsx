import React from 'react';

const BottomContainer: React.FC = props => (
  <div className="fixed bottom-0 w-screen flex justify-center z-10">
    {props.children}
  </div>
);

export default BottomContainer;
