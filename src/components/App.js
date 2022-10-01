import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadMap, fetchMaskData } from "../actions/index";

import Sidebar from './Sidebar';
import Map from './Map';

import Cookies from 'js-cookie';


const App = () => {
  const dispatch = useDispatch();
  const googleMap = useSelector((store) => store.googleMap);

  const center = {
    lat: 22.626780089095906,
    lng: 120.31808747527931,
  };

  const [isCorrectGoogleApiKey, setIsCorrectGoogleApiKey] = useState(false);
  const [googleApiKey, setGoogleApiKey] = useState(null);

  function googleMapApiErrorHandler() {
    if (Cookies.get("googleMapApiKey")) Cookies.remove('googleMapApiKey')
    window.location.reload()
  };
  
  useEffect(() => {
    if (googleApiKey) {
      dispatch(loadMap({
        googleMapsApiKey: googleApiKey,
        center: center
      }))
      dispatch(fetchMaskData());
    }
  }, [googleApiKey]);

  useEffect(() => {
    window.gm_authFailure = googleMapApiErrorHandler
    const apiKey = Cookies.get("googleMapApiKey");
    if (apiKey) setGoogleApiKey(apiKey);
  }, []);
  
  useEffect(() => {
    console.log("eeee",googleMap,isCorrectGoogleApiKey)
    if (googleMap.map) setIsCorrectGoogleApiKey(true);
  }, [googleMap]);

  return (
    <div className="relative bg-dark w-full h-screen flex overflow-x-hidden overflow-y-auto" >
      <Sidebar />
      <Map center={center} googleApiKey={googleApiKey} />
      {!isCorrectGoogleApiKey && (
        <div className='fixed h-screen w-screen top-0 left-0 bg-blackOpacity-50 z-10000 flex justify-center items-center'>
          <div className='bg-white p-10 w-full mx-3 lg:w-1/3 flex flex-col items-start relative'>
            <label htmlFor="googleApiKeyId" className="mb-3">
              請輸入您的 Google Map Api Key:
            </label>
            <input
              id="googleApiKeyId"
              className='w-full border border-black rounded p-2 mb-3'
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setGoogleApiKey(e.target.value);
                  Cookies.set("googleMapApiKey", e.target.value, { expires: 7 });
                }
              }}
            />
            <a target="_blank" href="https://developers.google.com/maps/premium/apikey/geocoding-apikey?hl=zh-tw" className="self-end text-sm text-blue-500 underline" rel="noreferrer">
              如何申請 Google Map Api Key
            </a>
          </div> 
        </div>
      )}
    </div>
  );
};

export default App;