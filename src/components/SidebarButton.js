import React from 'react';

const SidebarButton = (props) => {
  return (
    <React.Fragment>
      <div className="absolute -right-8 top-64">
        <button
          type="button"
          className="bg-primary w-8 h-24 flex items-center justify-center
            rounded-r-lg lg:hidden shadow-lg"
          onClick={() => { props.onClick(!props.toggleSidebar) }}
        >
          <span className="material-icons-outlined text-5xl text-warning">
            arrow_right
          </span>
        </button>
      </div>
      <div className="absolute bottom-5 right-5 md:hidden">
        <div
          className="w-16 h-16 flex items-center justify-center bg-primary rounded-full shadow-lg"
          onClick={() => { props.onClick(false) }}
        >
          <span className="material-icons-outlined text-4xl text-warning">
            location_on
          </span>
        </div>
      </div>
    </React.Fragment>
  )
};

export default SidebarButton;