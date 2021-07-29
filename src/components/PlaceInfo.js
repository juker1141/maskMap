import React from 'react';

const PlaceInfo = ({ place }) => {
  return (
    <div className="lg:px-4 lg:py-3">
      <div className="font-bold text-xl lg:text-2xl pb-1 flex justify-between items-center">
        {place.name}
      </div>
      <div className="text-secondary text-sm lg:text-base">
        {place.formatted_address}
      </div>
    </div >
  )
};

export default PlaceInfo;