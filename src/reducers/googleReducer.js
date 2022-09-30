import { INIT_MAP_SUCCESS, INIT_MAP_ERROR } from '../actions/types';

export default function googleReducer(state = null, action) {
  switch (action.type) {
    case INIT_MAP_SUCCESS:
      return action.payload;
    case INIT_MAP_ERROR:
      return state;
    default:
      return state;
  };
};