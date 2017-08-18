import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import AuthAdapter from './authAdapter'
import { getPlaces } from './apiAdapter'
import Auth from './authorize'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import ResultsContainer from './components/ResultsContainer'
import ProfileContainer from './components/ProfileContainer'


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

  componentWillMount(){
    // SETTING CURRENT USER
    console.log("setting id")
    this.getCurrentUser()
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
    getPlaces()
     .then(allPlaces => this.setState({ allPlaces }) )
  }

  componentDidUpdate(prevProps, prevState){
    let prevLat = prevState.auth.user.lat
    let currentLat = this.state.auth.user.lat
    let prevAddress = prevState.auth.user.address
    let currentAddress = this.state.auth.user.address

    if (prevLat != null && prevLat !== currentLat || prevAddress != '' && prevAddress !== currentAddress){
      console.log("GOT HERE")
      AuthAdapter.updateCurrentUser(this.state.auth)
      .then(res => console.log("response from updating user's address/lat/long", res))
    }

  }

  getCurrentUser = () => {
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


  handleLogin = (loginParams) => {
    AuthAdapter.login(loginParams)
      .then( res => {
        if (res.error) {
          alert(res.error)
        } else {
          localStorage.setItem('jwt', res.jwt)
          this.getCurrentUser()
        }
      })
  }

  handleSignup = (signupParams) => {
    AuthAdapter.signup(signupParams)
    .then(res => {
      console.log("signup json response", res)
      localStorage.setItem('jwt', res.jwt)
      this.setState({
        auth:{
          isLoggedIn: true,
          user: {
          ...this.state.auth.user,
          id: res.id
          }
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
        },
        isLoggedIn: false
      }
    })
  }


  setCurrentLocation = (address) => {
    geocodeByAddress(address)
    .then(results => {
      console.log("geocode by address results", results)
      this.setState({
        auth:{
          ...this.state.auth,
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
        ...this.state.auth,
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

          <Route exact path="/" render={()=> <Redirect to="/profile"/>}/>

          <Route path='/login' render={()=> this.state.auth.isLoggedIn ? <Redirect to="/profile"/> : <LoginForm onLogin={this.handleLogin}/> } />

          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/places/search"/> :  <SignUpForm onSignup={this.handleSignup}/>} />

          <Route path="/places" component={Auth(ResultsContainer, {user: this.state.auth.user, allPlaces: this.state.allPlaces, handleCurrentPlaceSelect: this.handleCurrentPlaceSelect, setCurrentLocation:this.setCurrentLocation} )}/>
          
          <Route path="/profile" component={Auth( ProfileContainer , {onLogout: this.handleLogout})} />

        </div>
      </Router>
    );
  }
}

export default App;
