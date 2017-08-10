import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import NavBar from './components/NavBar'
import ResultsContainer from './components/ResultsContainer'
import LocationSearch from './components/LocationSearch'


class App extends Component {

  constructor() {
    super()

    this.state = {
      auth: {
        currentUser: {},
      },
      allPlaces: [],
      currentPlaces: [],
      users: [],
      currentAds: [],
      currentUserSaves: [],
      selectedPlace: {},
      currentLat: null,
      currentLong: null,
      currentAddress: ''
    }
  }



  setCurrentLocation = (address) => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => this.setState({
      currentLat: latLng.lat,
      currentLong: latLng.lng
    }))

    geocodeByAddress(address)
    .then(results => results[0].formatted_address)
    .then(currentAddress => this.setState({
      currentAddress: currentAddress
    }))
  }





  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar}/>
          <Route exact path="/nearby" render={()=> <ResultsContainer currentAddress={this.state.currentAddress}/>}/>
          <Route exact path="/search" render={()=> <LocationSearch setCurrentLocation={this.setCurrentLocation}/>} />
          {/* <Route path="/" component={}/>
          <Route path="/" component={}/>
          <Route path="/" component={}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
