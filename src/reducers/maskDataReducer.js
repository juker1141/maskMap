import { FETCH_MASKDATA } from '../actions/types';

export default function googleMapReducer(state = [], action) {
  switch (action.type) {
    case FETCH_MASKDATA:
      return action.payload;
    default:
      return state;
  };
};