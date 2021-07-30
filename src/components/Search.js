import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { positioningPlace, updateArea } from '../actions';

import PlaceInfo from './PlaceInfo';

import options from './searchOptions';

class Search extends React.Component {
  state = { hasDownBeenPressed: false };

  componentDidMount() {
    this.searchPlaces();
  }

  componentDidUpdate() {
    this.searchPlaces();
  }

  computedArea(address) {
    const indexCity = address.indexOf('市');
    const indexCounty = address.indexOf('縣');
    let res = '';
    if (indexCounty !== -1) {
      res = address.slice(indexCounty - 2, indexCounty + 1);
    } else if (indexCity !== -1) {
      res = address.slice(indexCity - 2, indexCity + 1);
    };
    if (res[0] === '台') {
      res = res.replace('台', '臺')
    }
    this.props.updateArea(res);
  };

  searchPlaces() {
    if (this.props.google) {
      const google = this.props.google;
      const map = this.props.map;
      const infoWindow = this.props.infoWindow;
      const input = document.getElementById("googleInput");
      const autocomplete = new google.maps.places.Autocomplete(input, options);

      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });

      autocomplete.addListener("place_changed", () => {
        if (infoWindow) {
          infoWindow.close();
        };
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(4);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        this.props.positioningPlace(place);
        this.computedArea(place.formatted_address);

        input.value = '';

        const content = ReactDOMServer.renderToString(
          <PlaceInfo
            place={place}
          />
        );
        infoWindow.setContent(content);
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
      return (
        ''
      );
    };
  }

  render() {
    return (
      <div className="relative" >
        <input
          id="googleInput"
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full py-3 px-5"
          placeholder="請輸入區域,地址,藥局"
        />
        <div className="absolute right-2 top-2 flex items-center">
          <span className="material-icons-outlined py-1 px-2 rounded-full">
            search
          </span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  if (state.googleMap) {
    return {
      google: state.googleMap.google,
      map: state.googleMap.map,
      infoWindow: state.googleMap.infoWindow,
    };
  }
  return {};
}

export default connect(mapStateToProps, { positioningPlace, updateArea })(Search);