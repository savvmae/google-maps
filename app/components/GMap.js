import React from 'react';
import axios from 'axios';
import { Row, Col, ProgressBar } from 'react-materialize';
import { connect } from 'react-redux';
import MapStyles from './MapStyles';
import Script from 'react-load-script';
import SearchBar from './SearchBar';
import SpotDetail from './SpotDetail';
import MarkerDetailModal from './MarkerDetailModal'
import MarkerModal from './MarkerModal'
import { loading, searchCity, toggleMarkerModal, toggleSpotDetailModal, toggleRestrictedModal } from '../actions';

class GMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: null,
            searchCityAuto: '',
            searchCity: '',
            hasLoaded: true,
            currentMarker: null
        };
        this.mapCenter.bind(this);
    }
    loadMap() {
        const config = this.props.state;
        this.map = this.createMap(config.initialCenter);
        if (config && config.markers) {
            this.markers = this.createMarkers(config.markers);
            if (config.legend) {
                this.createLegend(config.icons);
            }
        }
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(map, 'click');
    }

    // createLegend(icons) {
    //     const { legend } = this.refs;
    //     for (const key in icons) {
    //         const type = icons[key], name = type.name, icon = type.image;
    //         const div = document.createElement('div');
    //         div.innerHTML = `<img src="${icon}"> ${name}`;
    //         legend.appendChild(div);
    //     }
    //     this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    // }

    createMap(center) {
        const config = this.props.state;
        const mapOptions = {
            zoom: config.initialZoom,
            center: center,
        }
        if (config) {
            mapOptions.styles = MapStyles(config.colors);
            mapOptions.mapTypeId = 'terrain';
        }
        let map = new google.maps.Map(this.refs.mapCanvas, mapOptions);
        map.setCenter(this.mapCenter(config.initialCenter.lat, config.initialCenter.lng));
        map.addListener('click', (e) => {
            if (this.props.state.loggedIn) {
                this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                let position = { lat: this.state.lat, lng: this.state.lng }
                this.props.toggleMarkerModal(position)
                this.newMarker(position)

            } else {
                this.props.toggleRestrictedModal()
            }
        })
        return map
    }

    createMarkers(markers) {
        const markersArray = markers.map((marker) => {
            const config = this.props.state,
                icon = config.icons && config.icons[marker.icon].image,
                thisMarker = this.newMarker(marker.position, icon, marker);
            return thisMarker;
        })
        return markersArray;
    }

    getUserLocation() {
        this.props.loading();
        this.setState({ hasLoaded: false })
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.loading();
            this.moveMap(position.coords.latitude, position.coords.longitude);
            this.newMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            this.props.toggleMarkerModal()
        }, () => alert("Couldn't find your location"))
    }

    handleMarkerClick(marker, details) {
        this.props.toggleSpotDetailModal(marker, details)
    }

    handleScriptCreate() {
        this.setState({
            scriptLoaded: false
        })
    }

    handleScriptError() {
        this.setState({
            scriptError: true
        })
    }

    handleScriptLoad() {
        this.setState({
            scriptLoaded: true
        });
        this.loadMap();
    }

    newMarker(position, image, details) {
        let thisMarker = new google.maps.Marker({
            position: position,
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: './parking.png'
        })

        if (details) {
            this.addMarkerClick(thisMarker, details)
        }
        else {
            this.setState({ currentMarker: thisMarker })
        }
        return thisMarker
    }

    setCurrentMarker = (marker, details) => {
        this.setState({ currentMarker: marker })
        this.handleMarkerClick(marker, details)
    }

    addMarkerClick = (marker, details) => {
        google.maps.event.clearListeners(marker, 'click');
        if (!details.position) {
            let thisMarkerDetail = {
                details: {
                    spotType: details.spotType,
                    spotNotes: details.spotNotes,
                    isSpotTaken: details.isSpotTaken
                },
                position: {
                    lat: details.lat,
                    lng: details.lng
                }
            }
            console.log(thisMarkerDetail.details.isSpotTaken)
            if (thisMarkerDetail.details.isSpotTaken) {
                marker.setIcon('./no-entry-sign.png')
            }
            google.maps.event.addListener(marker, 'click', () => this.setCurrentMarker(marker, thisMarkerDetail));
        }
        else {
            console.log(details.details.isSpotTaken)
            if (details.details.isSpotTaken) {
                marker.setIcon('./no-entry-sign.png')
            }
            google.maps.event.addListener(marker, 'click', () => this.setCurrentMarker(marker, details));
        }
    }

    removeMarker = () => {
        this.state.currentMarker.setMap(null)
        this.setState({ currentMarker: null })
    }

    mapCenter(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    }

    moveMap(lat, lng, message) {
        this.setState({
            center: this.mapCenter(lat, lng)
        });
        this.map.panTo(this.state.center);
    }

    handleChange = (e) => {
        this.setState({ searchCity: e.target.value })
        if (this.state.searchCity.length % 3 === 0) {
            let searchBox = new google.maps.places.Autocomplete(e.target);
            let that = this
            let hasDownBeenPressed = false;

            searchBox.addListener('keydown', (e) => {
                if (e.keyCode === 40) {
                    hasDownBeenPressed = true;
                }
            });
            google.maps.event.addDomListener(e.target, 'keydown', (e) => {
                e.cancelBubble = true;
                if (e.keyCode === 13 || e.keyCode === 9) {
                    if (!hasDownBeenPressed && !e.hasRanOnce) {
                        google.maps.event.trigger(e.target, 'keydown', {
                            keyCode: 40,
                            hasRanOnce: true,
                        });
                    }
                }
            });
            searchBox.addListener('focus', () => {
                hasDownBeenPressed = false;
                searchInput.value = '';
            });

            searchBox.addListener('place_changed', function () {
                that.props.loading()
                var places = searchBox.getPlace();
                that.setState({ searchCity: places.formatted_address })
                if (typeof places.address_components !== 'undefined') {
                    hasDownBeenPressed = false;
                }
                that.props.searchCity(places.formatted_address).then(res => {
                    that.moveMap(that.props.state.center.lat, that.props.state.center.lng);
                    that.setState({ searchCity: '' })
                })
            })
        }
    }
    render() {
        return (
            <div className="GMap">

                <Script
                    url={this.props.state.url}
                    onCreate={this.handleScriptCreate.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                <div className='GMap-canvas bor' ref="mapCanvas"></div>
                {this.props.state.loading
                    ? <Row>
                        <Col s={12}>
                            <div className="fifty-w margy-a">
                                <ProgressBar />
                            </div>
                        </Col>
                    </Row>
                    : null}
                <SearchBar handleChange={this.handleChange.bind(this)} searchCity={this.state.searchCity} />
                <button className="co-b btn z-zero" onClick={this.getUserLocation.bind(this)}>Use current Location</button>
                {this.props.state.showMarkerModal
                    ?
                    <MarkerModal
                        thisMarker={this.state.currentMarker}
                        removeMarker={this.removeMarker.bind(this)}
                    />
                    : null}
                {this.props.state.showMarkerDetailModal
                    ?
                    <MarkerDetailModal
                        currentMarker={this.state.currentMarker}
                        addMarkerClick={this.addMarkerClick.bind(this)}
                    />
                    : null}
                {this.props.state.showSpotDetailModal
                    ? <SpotDetail
                        removeMarker={this.removeMarker}
                        addMarkerClick={this.addMarkerClick.bind(this)}
                    />
                    : null}
                {this.props.state.showRestrictedModal
                    ?
                    <RestrictedModal />
                    : null}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: () => {
            return dispatch(loading())
        },
        searchCity: (location) => {
            return dispatch(searchCity(location))
        },
        toggleMarkerModal: (position) => {
            return dispatch(toggleMarkerModal(position))
        },
        toggleSpotDetailModal: (marker, details) => {
            return dispatch(toggleSpotDetailModal(marker, details))
        },
        toggleRestrictedModal: () => {
            return dispatch(toggleRestrictedModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GMap)