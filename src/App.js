import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import geolib from 'geolib'
import AuthAdapter from './authAdapter'
import { getPlaces, getPlace } from './apiAdapter'
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
      isSearching: false,
      // showBackButton: false
      // currentUserSaves: []
    }
  }

  componentWillMount(){
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
    console.log("componentDidMount")
    this.state.auth.isLoggedIn ?
      this.getPlacesAndDistances()
    :
      getPlaces()
       .then(allPlaces => {
         this.setState({
           allPlaces: allPlaces
        })
      })
  }



  componentDidUpdate(prevProps, prevState){
    let prevLat = prevState.auth.user.lat
    let currentLat = this.state.auth.user.lat
    let prevAddress = prevState.auth.user.address
    let currentAddress = this.state.auth.user.address

    if ((prevLat !== currentLat && this.state.allPlaces.length > 0) || prevState.allPlaces.length !== this.state.allPlaces.length && this.state.auth.user.lat !== null){
      console.log("setting new distances")
      let setNewDistances = this.state.allPlaces.map(place => this.addDistanceToPlace(place))
      let sortedPlaces = this.sortByDistance(setNewDistances)
      this.setState({
        allPlaces: sortedPlaces
      })
    }

    if (prevLat !== null && prevLat !== currentLat){
      this.setState({
        isSearching: true
      })
      AuthAdapter.updateCurrentUser(this.state.auth)
      .then(res => {
        if (res.newPlacesCount > 0){
          getPlaces()
           .then(allPlaces => {
             this.setState({
               allPlaces: allPlaces,
               isSearching: false
            })
          })
        } else {
          this.setState({
            isSearching: false
         })
        }
      })

    } else if (prevAddress !== '' && prevAddress !== currentAddress){
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

  getPlacesAndDistances = () => {
    getPlaces()
    .then(allPlaces => allPlaces.map(place => this.addDistanceToPlace(place)))
    .then(placesWithDistance => this.sortByDistance(placesWithDistance))
    .then(sortedPlaces =>  this.setState({
      allPlaces: sortedPlaces,
    }))
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

  addDistanceToPlace = (place) => {
    let distance = geolib.getDistance({latitude: this.state.auth.user.lat, longitude: this.state.auth.user.long}, {latitude: place.lat, longitude: place.long} )
      place.distance = distance
      return place
  }

  sortByDistance = (placesArray) => {
    return placesArray.sort(function(a,b){
      return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
    })
  }


  render() {
    console.log("app state",this.state)
    return (
      <Router>
        <div className='appContainer'>
          {/* <Route path="/" render={(props) => <NavBar showBackButton={this.state.showBackButton} {...props} />}/> */}
          <Route path="/" component={NavBar} />

          <Route exact path="/" render={()=> <Redirect to="/profile"/>}/>

          <Route exact path="/places" render={()=> <Redirect to="/places/map"/> }/>

          <Route path='/login' render={()=> this.state.auth.isLoggedIn ? <Redirect to="/profile"/> : <LoginForm onLogin={this.handleLogin}/> } />

          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/places/search"/> :  <SignUpForm onSignup={this.handleSignup}/>} />

          <Route path="/places" component={Auth(ResultsContainer, {user: this.state.auth.user, allPlaces: this.state.allPlaces, handleCurrentPlaceSelect: this.handleCurrentPlaceSelect, setCurrentLocation:this.setCurrentLocation, getPlacesAndDistances: this.getPlacesAndDistances, currentPlace: this.state.currentPlace, isSearching: this.state.isSearching} )}/>

          <Route path="/profile" component={Auth( ProfileContainer , {onLogout: this.handleLogout})} />
        </div>
      </Router>
    );
  }
}

export default App;
