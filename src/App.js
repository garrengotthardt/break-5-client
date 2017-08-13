import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import NavBar from './components/NavBar'
import ResultsContainer from './components/ResultsContainer'
import ProfileContainer from './components/ProfileContainer'
import LocationSearch from './components/LocationSearch'
import LoginForm from './components/LoginForm'
import AuthAdapter from './authAdapter'
import Auth from './authorize'
import AddNewMenuItem from './components/AddNewMenuItem'
import PlaceContainer from './components/PlaceContainer'
import ResultsMap from './components/ResultsMap'
import ResultsList from './components/ResultsList'

class App extends Component {

  constructor() {
    super()

    this.state = {
      auth: {
        userID: null,
        currentLat: null,
        currentLong: null,
        currentAddress: ''
      },
      allPlaces: [],
      currentPlace: {},
      // currentPlaces: [],
      // users: [],
      currentUserSaves: []
    }
  }

  isLoggedIn = () => !!window.localStorage.jwt

  componentWillMount(){

    console.log("setting id")
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
      .then(res => this.setState({
          auth: {
            currentAddress: res.address,
            userID: res.id,
            currentLat: res.lat,
            currentLong: res.long
          },
        })
      )
    }
  }

  // componentWillReceiveProps(nextProps){
  //   console.log("componentWillReceiveProps", nextProps)
  // }
  //
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldComponentUpdate", nextProps, nextState)
  //   return true;
  // }



  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/places`)
     .then(data => data.json())
     .then(allPlaces => this.setState({ allPlaces })
     )
  }

  componentDidUpdate(prevProps, prevState){
    console.log("did update - previous state address:",prevState.auth.currentAddress, "current state address:", this.state.auth.currentAddress)
    if (prevState.auth.currentLat !== this.state.auth.currentLat || prevState.auth.currentAddress !== this.state.auth.currentAddress){
      console.log("GOT HERE")
      fetch(`http://localhost:3000/api/v1/users/${this.state.auth.userID}`, {
          method: 'PUT',
          body: JSON.stringify({address: `${this.state.auth.currentAddress}`, lat: `${this.state.auth.currentLat}`, long: `${this.state.auth.currentLong}`}),
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': localStorage.getItem('jwt')
          }
        })
    }
  }


  handleLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
      .then( res => {
        //check for an error message
        if( res.error ){
          console.log("do nothing")
        }else{
          console.log(res)
          localStorage.setItem('jwt', res.jwt)
          this.setState({
            auth:{
              ...this.state.auth,
              userID: res.id
            }
          })
        }
        //if error render login again
        //else set the jwt token and forward user to /giphs
      })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        userID: ''
      }
    })
  }


  setCurrentLocation = (address) => {

    geocodeByAddress(address)
    .then(results => {
      this.setState({
        auth:{
          ...this.state.auth,
          currentAddress: results[0].formatted_address
        }
      })
      //ADD POST REQUEST TO DATABASE TO UPDATE CURRENT USER ADDRESS
      return getLatLng(results[0])
    })
    .then(latLng => this.setState({
      auth:{
        ...this.state.auth,
        currentLat: latLng.lat,
        currentLong: latLng.lng
      }
    }))

  }


  //CURRENT PLACE HANDLER
  handleCurrentPlaceSelect = (currentPlace) => {
      this.setState({ currentPlace })
  }





  render() {
    console.log("app state",this.state)
    this.state.auth.userID !== null && this.state.currentAddress === '' ? this.setCurrentUserDetails() : null
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar}/>
          <Route path='/login' render={()=> this.isLoggedIn() ? <Redirect to="/places/list"/> : <LoginForm onLogin={this.handleLogin}/> } />

          <Route path="/places" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> : <ResultsContainer currentAddress={this.state.auth.currentAddress} currentUserLat={this.state.auth.currentLat} currentUserLong={this.state.auth.currentLong} allPlaces={this.state.allPlaces} handleCurrentPlaceSelect={this.handleCurrentPlaceSelect} />}/>

          <Switch>
            <Route exact path="/places/map" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> : <ResultsMap currentAddress={this.state.auth.currentAddress} currentUserLat={this.state.auth.currentLat} currentUserLong={this.state.auth.currentLong} allPlaces={this.state.allPlaces} handleCurrentPlaceSelect={this.handleCurrentPlaceSelect} />}/>

            <Route exact path="/places/list" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> : <ResultsList currentAddress={this.state.auth.currentAddress} currentUserLat={this.state.auth.currentLat} currentUserLong={this.state.auth.currentLong} allPlaces={this.state.allPlaces} handleCurrentPlaceSelect={this.handleCurrentPlaceSelect} />}/>

            <Route exact path="/places/search" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> :<LocationSearch currentLocation={this.state.auth.currentAddress} setCurrentLocation={this.setCurrentLocation}/>} />

            <Route exact path="/places/new" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> :<AddNewMenuItem />} />

            <Route path="/places/:id" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> : <PlaceContainer currentPlace={this.state.currentPlace} /> } />
          </Switch>


          <Route exact path="/profile" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> :<ProfileContainer onLogout={this.handleLogout}/>} />

        </div>
      </Router>
    );
  }
}

export default App;
