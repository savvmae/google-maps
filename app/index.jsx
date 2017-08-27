import React from 'react';
import axios from 'axios'
import { render } from 'react-dom';
import GMap from './components/GMap.jsx';
import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      searchCity: null,
      lat: null,
      lng: null
    }
    
  }
  get basicSettings() {
    return {
      initialCenter: {
        lat: 32.8000 || this.state.lat,
        lng: -79.9311 || this.state.lng
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

  handleSearchSubmit(e) {
    e.preventDefault();
    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.state.searchCity + '&key=AIzaSyAWa0K4pJPUraabbqexa91ToelqfKN7QNQ')
    .then(res => {
      let location = res.data.results[0].geometry.location;
      this.setState({lat: location.lat, lng: location.lng})
    })

    this.setState({ searchCity: '' })
    console.log('i am in index' ,this.state)
  }



  render() {
    return (
      <div>
        <div className="mapContainer">
          <GMap config={this.multipleMarkersSettings} />
          <SearchBar handleSearchSubmit={this.handleSearchSubmit}/>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('ReactGMapsApp'));
