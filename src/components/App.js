import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Map from './Map';

const App = () => {
  const googleMap = useSelector((store) => store.googleMap);

  const center = {
    lat: 22.626780089095906,
    lng: 120.31808747527931,
  };

  const [isCorrectGoogleApiKey, setIsCorrectGoogleApiKey] = useState(false);
  const [googleApiKey, setGoogleApiKey] = useState(null);
  
  useEffect(() => {
    console.log(googleMap)
    if (googleMap) setIsCorrectGoogleApiKey(true);
  }, [googleMap]);

  return (
    <div className="relative bg-dark w-full h-screen flex overflow-x-hidden overflow-y-auto" >
      <Sidebar />
      <Map center={center} googleApiKey={googleApiKey} />
      {!isCorrectGoogleApiKey && (
        <div className='absolute h-full w-full top-0 left-0 bg-blackOpacity-50 z-50 flex justify-center items-center'>
          <div className='bg-white p-10 mt-24 w-full lg:w-1/3 flex flex-col items-start'>
            <label htmlFor="googleApiKeyId" className="mb-3">請輸入您的 Google Map Api Key:</label>
            <input
              id="googleApiKeyId"
              className='w-full border border-black rounded p-2'
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setGoogleApiKey(e.target.value)
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;