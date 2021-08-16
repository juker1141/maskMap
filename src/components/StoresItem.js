import React from 'react';
import StoresMaskNum from './StoresMaskNum';

const StoresItem = ({ store, isInfoWindow = false, onClick = null }) => {
  return (
    <div className={`${isInfoWindow ? "" : "px-3 py-2"} storesItemStyle`} onClick={onClick}>
      <div className="font-bold text-xl lg:text-2xl pb-1 flex justify-between items-center pr-5">
        {store.properties.name}
      </div>
      <div className="text-secondary text-sm lg:text-base">
        <div className="pb-1">{store.properties.address}</div>
        <div className={store.properties.note !== "-" ? "pb-1" : "pb-3"}>{store.properties.phone}</div>
        {store.properties.note !== "-" ? <div className="pb-3">{store.properties.note}</div> : ''}
        <StoresMaskNum mask_adult={store.properties.mask_adult} mask_child={store.properties.mask_child} isInfoWindow={isInfoWindow} />
      </div>
    </div >
  )
};

export default StoresItem;