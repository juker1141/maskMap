import { UPDATE_CLOSEST_STORES } from '../actions/types';

export default function closestStoresReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_CLOSEST_STORES:
      return action.payload;
    default:
      return state;
  };
};