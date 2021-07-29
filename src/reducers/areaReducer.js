import { UPDATE_AREA } from '../actions/types';

export default function areaReducer(state = '高雄市', action) {
  switch (action.type) {
    case UPDATE_AREA:
      return action.payload;
    default:
      return state;
  };
};