import React from 'react';

import Sidebar from './Sidebar';
import Map from './Map';

const App = () => {
  return (
    <div className="relative bg-dark w-full h-screen flex overflow-x-hidden overflow-y-auto" >
      <Sidebar />
      <Map />
    </div>
  );
};

export default App;