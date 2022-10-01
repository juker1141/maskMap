import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { connect } from "react-redux";
import { loadMap, fetchMaskData, updateClosestStores } from "../actions";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getLocalMaskList } from "../selects";

import StoresItem from "./StoresItem";


let markerClusterer;
let markers;

const Map = (props) => {
  useEffect(() => {
    if (markers) {
      findClosestMarkers(markers);
    }
  }, [markers]);

  function initMarkers() {
    if (markerClusterer) {
      markerClusterer.clearMarkers();
    }
    createMarkers();
  }

  function markerFillColor(properties) {
    const totalMaskNum = properties.mask_adult + properties.mask_child;
    if (totalMaskNum >= 3000) {
      return "#22C55E";
    } else if (totalMaskNum <= 2999 && totalMaskNum >= 1000) {
      return "#F97316";
    } else if (totalMaskNum <= 999 && totalMaskNum > 0) {
      return "#DC2626";
    } else if (totalMaskNum === 0) {
      return "#A5A5A5";
    }
  }

  function createMarkers() {
    if (props.google) {
      const google = props.google;
      const map = props.map;
      const infoWindow = props.infoWindow;
      markers = props.maskData.map(({ geometry, properties }) => {
        const coords = geometry.coordinates;
        const marker = new google.maps.Marker({
          position: { lat: coords[1], lng: coords[0] },
          icon: {
            path: faMapMarkerAlt.icon[4],
            fillColor: markerFillColor(properties),
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

        marker.addListener(
          "click",
          (e) => {
            const content = ReactDOMServer.renderToString(
              <StoresItem store={marker} isInfoWindow={true} />
            );
            infoWindow.close();
            infoWindow.setContent(content);
            infoWindow.open(marker.getMap(), marker);
          },
          false
        );

        return marker;
      });

      markerClusterer = new MarkerClusterer({map, markers});
    }
  }

  function findClosestMarkers(markers, n = 10) {
    let markersDistances = [];
    if (props.google) {
      const google = props.google;
      let latLng;
      if (!props.place) {
        latLng = new google.maps.LatLng(props.center.lat, props.center.lng);
      } else {
        latLng = props.place.geometry.location;
      }
      markers.map((marker) => {
        let d = google.maps.geometry.spherical.computeDistanceBetween(
          marker.position,
          latLng
        );
        return markersDistances.push({
          distance: d,
          marker: marker,
        });
      });
      let closestMarkers = markersDistances
        .sort((a, b) => {
          return a.distance - b.distance;
        })
        .slice(0, n);
      props.updateClosestStores(closestMarkers);
    }
  }

  return (
    <div id="map" className="h-screen w-full lg:w-2/3 xl:w-3/4">
      {initMarkers()}
    </div>
  );
}

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
};

export default connect(mapStateToProps, {
  loadMap,
  fetchMaskData,
  updateClosestStores,
})(Map);
