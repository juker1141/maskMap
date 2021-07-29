import { combineReducers } from 'redux';
import googleReducer from './googleReducer';
import maskDataReducer from './maskDataReducer';
import areaReducer from './areaReducer';
import placeReducer from './placeReducer';
import closestStoresReducer from './closestStoresReducer';

export default combineReducers({
  googleMap: googleReducer,
  maskData: maskDataReducer,
  area: areaReducer,
  place: placeReducer,
  closestStores: closestStoresReducer,
})