import React, { useState } from 'react';

import Header from './Header';
import StoresList from './StoresList';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <div
      className={`w-full md:w-1/2 lg:w-2/3 xl:w-1/3 2xl:w-1/4
      fixed lg:relative inset-y-0 bg-white z-20 
      ${toggleSidebar ? '' : '-left-full md:-left-1/2 lg:-left-0 '}`}
    >
      <div className="h-100 w-full overflow-y-auto overflow-x-hidden scrollbar-hidden">
        <Header />
        <StoresList onClick={(status) => { setToggleSidebar(status) }} />
      </div>
      <SidebarButton toggleSidebar={toggleSidebar} onClick={(status) => { setToggleSidebar(status) }} />
    </div>
  )
};

export default Sidebar;