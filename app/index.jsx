import React from 'react';
import { render } from 'react-dom';
import GMap from './components/GMap.jsx';

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      searchCity: null,
      lat: 32.8000,
      lng: -79.9311
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
    settings.snapToUserLocation = true;
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
        <div className="mapContainer">
          <GMap config={this.multipleMarkersSettings} />
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('ReactGMapsApp'));
