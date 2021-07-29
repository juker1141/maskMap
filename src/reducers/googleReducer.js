import { INIT_MAP } from '../actions/types';

export default function googleReducer(state = null, action) {
  switch (action.type) {
    case INIT_MAP:
      return action.payload;
    default:
      return state;
  };
};