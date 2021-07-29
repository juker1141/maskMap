import React from 'react';

const MaskBgColor = (num) => {
  if (num >= 1500) {
    return '#16A34A';
  } else if (num <= 1499 && num >= 500) {
    return '#F97316';
  } else if (num <= 499 && num > 0) {
    return '#DC2626';
  } else if (num === 0) {
    return '#A5A5A5';
  }

}

const StoresMaskNum = ({ mask_adult, mask_child, isInfoWindow = false }) => {
  return (
    <div className={`flex justify-between text-white ${isInfoWindow ? 'flex-col lg:flex-row' : ''}`}>
      <div
        style={{ backgroundColor: `${MaskBgColor(mask_adult)}` }}
        className={`bg-primary flex justify-between items-center rounded-full
      w-1/2 px-6 py-2 lg:mr-4 font-bold storesMaskNumStyle ${isInfoWindow ? 'mb-2 lg:mb-0' : 'mr-4'}`}
      >
        <div>成人{`${isInfoWindow ? '' : '口罩'}`}</div>
        <div className="text-xl">{mask_adult}</div>
      </div>
      <div
        style={{ backgroundColor: `${MaskBgColor(mask_child)}` }}
        className="bg-primary flex justify-between items-center rounded-full
      w-1/2 px-6 py-2 font-bold storesMaskNumStyle"
      >
        <div>兒童{`${isInfoWindow ? '' : '口罩'}`}</div>
        <div className="text-xl">{mask_child}</div>
      </div>
    </div>
  )
};

export default StoresMaskNum;