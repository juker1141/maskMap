import { POSITIONING_PLACE } from '../actions/types';

export default function placeReducer(state = null, action) {
  switch (action.type) {
    case POSITIONING_PLACE:
      return action.payload;
    default:
      return state;
  };
};