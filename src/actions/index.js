import {
  INIT_MAP,
  FETCH_MASKDATA,
  POSITIONING_PLACE,
  UPDATE_AREA,
  UPDATE_CLOSEST_STORES,
} from './types';
import { Loader } from '@googlemaps/js-api-loader';
import keys from '../config/keys';
import axios from 'axios';

export const loadMap = (center) => async (dispatch) => {
  const loader = new Loader({
    apiKey: keys.googleMapsApiKey,
    version: "weekly",
    libraries: ["places", "geometry"],
  });

  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        mapId: "33a69fd581e68382",
      });
      const infoWindow = new google.maps.InfoWindow({
        maxWidth: 500,
      });
      dispatch({ type: INIT_MAP, payload: { google, map, infoWindow } });
    })
    .catch(e => {
      // do something
    });
};

export const fetchMaskData = () => async (dispatch) => {
  const res = await axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');

  dispatch({ type: FETCH_MASKDATA, payload: res.data.features });
};

export const positioningPlace = (place) => {
  return { type: POSITIONING_PLACE, payload: place };
}

export const updateArea = (area) => {
  return { type: UPDATE_AREA, payload: area };
};

export const updateClosestStores = (list) => {
  return { type: UPDATE_CLOSEST_STORES, payload: list };
};