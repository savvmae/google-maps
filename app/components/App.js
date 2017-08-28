import React, {Component} from 'react';
import { connect } from 'react-redux'
import { render } from 'react-dom';
import GMap from './GMap';
import LandingModal from './LandingModal';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      searchCity: null,
      lat: 32.8000,
      lng: -79.9311,
      landingModal: true
    }

  }
  get basicSettings() {
    return {
      initialCenter: {
        lat: this.state.lat,
        lng: this.state.lng
      },
      initialZoom: 12,
    }
  }

  get multipleMarkersSettings() {
    let settings = this.basicSettings;
    settings.snapToUserLocation = false;
    settings.initialZoom = 10;
    settings.colors = {
      base: "#212121",
      baseContour1: "#4d4d4d",
      baseContour2: "#797979",
      baseContour3: "#a6a6a6",
      accent: "#fcbd40",
      accentLight: "#fcb24b"
    }
    settings.markers = [
      {
        position: {
          lat: 32.7000,
          lng: -79.9311
        },
        message: "One."
      },
      {
        position: {
          lat: 32.8900,
          lng: -79.9511
        },
        message: "Two."
      },
      {
        position: {
          lat: 32.8000,
          lng: -79.9811
        },
        message: "Three."
      }
    ]
    return settings;
  }

  render() {
    return (
      <div>
        {this.state.landingModal
          ?
          <LandingModal />
          : null}
        <div className="mapContainer">
          <GMap config={this.multipleMarkersSettings} />

        </div>
      </div>
    )
  }
}


