import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import matrix from 'google-distance-matrix';
import NavBar from './components/NavBar'
import ResultsContainer from './components/ResultsContainer'
import ProfileContainer from './components/ProfileContainer'
import LocationSearch from './components/LocationSearch'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
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
        user: {
          id: null,
          lat: null,
          long: null,
          address: ''
        },
        isLoggedIn: false
      },
      allPlaces: [],
      sortedPlaces: [],
      currentPlace: {},
      currentUserSaves: []
    }
  }

  isLoggedIn = () => !!window.localStorage.jwt

  componentWillMount(){


    // SETTING CURRENT USER
    console.log("setting id")
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
      .then(res => this.setState({
          auth: {
            user: {
            address: res.address,
            id: res.id,
            lat: res.lat,
            long: res.long
          },
          isLoggedIn: true
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
    console.log("did update - previous state address:",prevState.auth.user.address, "current state address:", this.state.auth.user.address)
    if (prevState.auth.user.lat !== this.state.auth.user.lat || prevState.auth.user.address !== this.state.auth.user.address){
      console.log("GOT HERE")
      AuthAdapter.updateCurrentUser(this.state.auth)
      .then(res => console.log("response from updating user's address/lat/long", res))
    }


    // ATTEMPT AT DISTANCE SORTING
    // if (this.state.auth.lat !== null && this.state.allPlaces !== []){
      // var distance = require('google-distance-matrix');
      // distance.key('AIzaSyA1zRQuw4cXyTIcxx5Hi2zJr9qQwHjF4Ls');
      // var origins = ['San Francisco CA'];
      // var destinations = ['New York NY', '41.8337329,-87.7321554'];
      //
      // distance.matrix(origins, destinations, function (err, distances) {
      //   if (!err)
      //     console.log(distances);
      //   })
    // }

  }


  handleLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
      .then( res => {
        //check for an error message
        if( res.error ){
          console.log(res.error)
        } else {
          console.log(res)
          localStorage.setItem('jwt', res.jwt)
          this.setState({
            auth:{
              user: {
              ...this.state.auth.user,
              id: res.id
            },
            isLoggedIn: true
            }
          })
        }
        //if error render login again
        //else set the jwt token and forward user to /giphs
      })
  }

  handleSignup = (signupParams) => {
    AuthAdapter.signup(signupParams)
    .then(res => {
      console.log("signup json response", res)
      localStorage.setItem('jwt', res.jwt)
      this.setState({
        auth:{
          user: {
          ...this.state.auth.user,
          id: res.id
          },
          isLoggedIn: true
        }
      })
    })
  }


  handleLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        user: {
          ...this.state.auth.user,
          id: ''
        }
      }
    })
  }


  setCurrentLocation = (address) => {
    geocodeByAddress(address)
    .then(results => {
      this.setState({
        auth:{
          user:{
            ...this.state.auth.user,
            address: results[0].formatted_address
          }
        }
      })
      return getLatLng(results[0])
    })
    .then(latLng => this.setState({
      auth:{
        user:{
          ...this.state.auth.user,
          lat: latLng.lat,
          long: latLng.lng
        }
      }
    }))
  }


  //CURRENT PLACE HANDLER
  handleCurrentPlaceSelect = (currentPlace) => {
      this.setState({ currentPlace })
  }


  render() {
    console.log("app state",this.state)
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar}/>

          <Route path='/login' render={()=> this.state.auth.isLoggedIn ? <Redirect to="/profile"/> : <LoginForm onLogin={this.handleLogin}/> } />

          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/places/search"/> :  <SignUpForm onSignup={this.handleSignup}/>} />

          <Route path="/places" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> : <ResultsContainer address={this.state.auth.user.address} currentUserLat={this.state.auth.user.lat} currentUserLong={this.state.auth.user.long} allPlaces={this.state.allPlaces} handleCurrentPlaceSelect={this.handleCurrentPlaceSelect} />}/>

          <Switch>
            <Route exact path="/places/map" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> : <ResultsMap address={this.state.auth.user.address} currentUserLat={this.state.auth.user.lat} currentUserLong={this.state.auth.user.long} allPlaces={this.state.allPlaces} handleCurrentPlaceSelect={this.handleCurrentPlaceSelect} />}/>

            <Route exact path="/places/list" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> : <ResultsList address={this.state.auth.user.address} currentUserLat={this.state.auth.user.lat} currentUserLong={this.state.auth.user.long} allPlaces={this.state.allPlaces} handleCurrentPlaceSelect={this.handleCurrentPlaceSelect} />}/>

            <Route exact path="/places/search" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> :<LocationSearch currentLocation={this.state.auth.user.address} setCurrentLocation={this.setCurrentLocation}/>} />

            <Route exact path="/places/new" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> :<AddNewMenuItem />} />

            <Route path="/places/:id" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> : <PlaceContainer currentPlace={this.state.currentPlace} /> } />
          </Switch>


          <Route exact path="/profile" render={()=> !this.state.auth.isLoggedIn ? <Redirect to="/login"/> :<ProfileContainer onLogout={this.handleLogout}/>} />

        </div>
      </Router>
    );
  }
}

export default App;
