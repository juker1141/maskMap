import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { connect } from 'react-redux';
import { loadMap, fetchMaskData, updateClosestStores } from '../actions';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getLocalMaskList } from '../selects';

import StoresItem from './StoresItem';

const center = {
  lat: 22.626780089095906,
  lng: 120.31808747527931,
};
let markerClusterer;
let markers;
class Map extends React.Component {

  componentDidMount() {
    this.props.loadMap(center);
    this.props.fetchMaskData();

  };

  componentDidUpdate() {
    if (markers) {
      this.findClosestMarkers(markers);
    }
  }

  initMarkers() {
    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }
    this.createMarkers();
  }

  markerFillColor(properties) {
    const totalMaskNum = properties.mask_adult + properties.mask_child;
    if (totalMaskNum >= 3000) {
      return '#22C55E';
    } else if (totalMaskNum <= 2999 && totalMaskNum >= 1000) {
      return '#F97316';
    } else if (totalMaskNum <= 999 && totalMaskNum > 0) {
      return '#DC2626';
    } else if (totalMaskNum === 0) {
      return '#A5A5A5';
    }
  }

  createMarkers() {
    if (this.props.google) {
      const google = this.props.google;
      const map = this.props.map;
      const infoWindow = this.props.infoWindow;
      markers = this.props.maskData.map(({ geometry, properties }) => {
        const coords = geometry.coordinates;
        const marker = new google.maps.Marker({
          position: { lat: coords[1], lng: coords[0] },
          icon: {
            path: faMapMarkerAlt.icon[4],
            fillColor: this.markerFillColor(properties),
            fillOpacity: 1,
            anchor: new google.maps.Point(
              faMapMarkerAlt.icon[0] / 2, // width
              faMapMarkerAlt.icon[1] // height
            ),
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.075,
          },
          properties,
        });

        marker.addListener("click", (e) => {
          const content = ReactDOMServer.renderToString(
            <StoresItem
              store={marker}
              isInfoWindow={true}
            />
          );
          infoWindow.close();
          infoWindow.setContent(content);
          infoWindow.open(marker.getMap(), marker);
        }, false);

        return marker;
      });

      markerClusterer = new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    };
  }

  findClosestMarkers(markers, n = 10) {
    let markersDistances = [];
    if (this.props.google) {
      const google = this.props.google;
      let latLng;
      if (!this.props.place) {
        latLng = new google.maps.LatLng(center.lat, center.lng);;
      } else {
        latLng = this.props.place.geometry.location;
      }
      markers.map((marker) => {
        let d = google.maps.geometry.spherical.computeDistanceBetween(marker.position, latLng);
        return markersDistances.push({
          distance: d,
          marker: marker,
        })
      })
      let closestMarkers = markersDistances.sort((a, b) => { return a.distance - b.distance }).slice(0, n);
      this.props.updateClosestStores(closestMarkers);
    }
  };

  render() {
    return <div id="map" className="h-screen w-full lg:w-2/3 xl:w-3/4">
      {this.initMarkers()}
    </div>
  };
};

const mapStateToProps = (state) => {
  if (state.googleMap) {
    return {
      google: state.googleMap.google,
      map: state.googleMap.map,
      infoWindow: state.googleMap.infoWindow,
      place: state.place,
      area: state.area,
      maskData: getLocalMaskList(state),
    };
  }
  return { maskData: getLocalMaskList(state) };
}

export default connect(mapStateToProps, { loadMap, fetchMaskData, updateClosestStores })(Map);