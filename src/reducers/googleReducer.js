import { INIT_MAP_SUCCESS, INIT_MAP_ERROR } from '../actions/types';
import _ from "lodash";

const initState = { 
  google: null,
  map: null,
  infoWindow: null,
  error: false,
}

export default function googleReducer(state = initState, action) {
  switch (action.type) {
    case INIT_MAP_SUCCESS:
      return action.payload;
    case INIT_MAP_ERROR:
      const newState = _.cloneDeep({...initState, error: true})
      return newState;
    default:
      return state;
  };
};