import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';

import StoresItem from './StoresItem';



class StoresList extends React.Component {
  handleClick(map, infoWindow, LatLng, marker) {
    const content = ReactDOMServer.renderToString(
      <StoresItem
        store={marker}
        isInfoWindow={true}
      />
    );
    console.log(content)
    infoWindow.close();
    map.setCenter(LatLng)
    map.setZoom(19)
    infoWindow.setContent(content);
    infoWindow.open(marker.getMap(), marker);
    this.props.onClick(false);
  }

  renderList() {
    if (this.props.google) {
      const google = this.props.google;
      const map = this.props.map;
      const infoWindow = this.props.infoWindow;
      return this.props.list.map(({ marker }, index) => {
        const LatLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        return (
          <React.Fragment key={index}>
            <StoresItem
              store={marker}
              onClick={() => { this.handleClick(map, infoWindow, LatLng, marker) }}
            />
            <hr className={`border-gray ${index === 9 ? 'hidden' : ''}`} />
          </React.Fragment>
        )
      })
    }
  }

  render() {
    return (
      <div>{this.renderList()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.googleMap) {
    return {
      list: state.closestStores,
      google: state.googleMap.google,
      map: state.googleMap.map,
      infoWindow: state.googleMap.infoWindow,
    }
  }
  return {
    list: null,
  }
}

export default connect(mapStateToProps)(StoresList);