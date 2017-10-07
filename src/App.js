import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import geolib from 'geolib'
import AuthAdapter from './authAdapter'
import { getPlaces, getPlace, saveUserPlace, unsaveUserPlace } from './apiAdapter'
import Auth from './authorize'
import NavBar from './components/NavBar'
import Home from './components/Home'
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
          firstName: null,
          lastName: null,
          email: null,
          lat: null,
          long: null,
          address: '',
          savedPlaceIDs: [],
          savedPlaceList: []
        },
        isLoggedIn: false
      },
      allPlaces: [],
      displayedPlaces: [],
      remainingPlaces: [],
      displayedSavedPlaces: [],
      remainingSavedPlaces: [],
      isSearching: false
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
    this.state.auth.isLoggedIn ?
      this.getPlacesAndDistances()
    :
      getPlaces()
       .then(allPlaces => {
         this.setState({
           allPlaces: allPlaces,
           displayedPlaces: allPlaces.slice(0,10),
           remainingPlaces: allPlaces.slice(11,-1),
           auth:{
             user: {
             ...this.state.auth.user,
             savedPlaceList: allPlaces.filter(place => this.state.auth.user.savedPlaceIDs.map(savedPlace => savedPlace.place_id).includes(place.id))
             }
           }
        })
      })
  }



  componentDidUpdate(prevProps, prevState){
    let prevLat = prevState.auth.user.lat
    let currentLat = this.state.auth.user.lat
    let prevAddress = prevState.auth.user.address
    let currentAddress = this.state.auth.user.address

    if ((prevLat !== currentLat && this.state.allPlaces.length > 0) || prevState.allPlaces.length !== this.state.allPlaces.length && this.state.auth.user.lat !== null){
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
            ... this.state.auth.user,
            id: res.id,
            firstName: res.first_name,
            lastName: res.last_name,
            email: res.email,
            address: res.address,
            lat: res.lat,
            long: res.long,
            savedPlaceIDs: res.saved_places
            },
          isLoggedIn: true
          },

          displayedSavedPlaces: this.filterSavedPlaces(res.saved_places.slice(0,10)),
          remainingSavedPlaces: this.filterSavedPlaces(res.saved_places.slice(11,-1))

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


  /* SAVE & UNSAVE PLACES */

  filterSavedPlaces = (savedPlacesForDisplay) => {
    this.state.allPlaces.filter(place => (savedPlacesForDisplay.map(savedPlace => savedPlace.place_id).includes(place.id)))
  }

  favoritePlace = (userID, placeID) => {
    saveUserPlace(userID, placeID)
    .then(() => this.getCurrentUser())
  }

  unfavoritePlace = (userPlaceID) => {
    unsaveUserPlace(userPlaceID)
    .then(() => this.getCurrentUser())
  }


/* Load More on List */
  loadMorePlaces = () => {
      if (this.state.remainingPlaces.length >= 10){
        this.setState({
          displayedPlaces: this.state.displayedPlaces.concat(this.state.remainingPlaces.splice(0,10))
        })
      } else if (this.state.remainingPlaces.length < 10 && this.state.remainingPlaces.length < 10) {
        this.setState({
          displayedPlaces: this.state.displayedPlaces.concat(this.state.remainingPlaces),
          remainingPlaces: []
        })
      }
    }

    loadMoreSavedPlaces = () => {
        if (this.state.remainingSavedPlaces.length >= 10){
          this.setState({
            displayedSavedPlaces: this.state.displayedPlaces.concat(this.state.remainingPlaces.splice(0,10))
          })
        } else if (this.state.remainingPlaces.length < 10 && this.state.remainingPlaces.length < 10) {
          this.setState({
            displayedSavedPlaces: this.state.displayedPlaces.concat(this.state.remainingPlaces),
            remainingSavedPlaces: []
          })
        }
      }


  render() {
    console.log(this.state)
    return (
      <Router>
        <div className='appContainer'>
          <Route path="/" component={NavBar} />

          <Route exact path="/" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/places"/> : <Home onLogin={this.handleLogin}/> }/>

          <Route exact path="/places" render={()=> <Redirect to="/places/map"/> }/>

          <Route path='/login' render={()=> this.state.auth.isLoggedIn ? <Redirect to="/places"/> : <LoginForm onLogin={this.handleLogin}/> } />

          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/places/search"/> :  <SignUpForm onSignup={this.handleSignup}/>} />

          <Route path="/places" component={Auth(ResultsContainer, {user: this.state.auth.user, allPlaces: this.state.allPlaces, displayedPlaces: this.state.displayedPlaces, remainingPlaces: this.state.remainingPlaces, savedPlaces: this.state.auth.user.savedPlaceIDs, handleCurrentPlaceSelect: this.handleCurrentPlaceSelect, favoritePlace: this.favoritePlace, unfavoritePlace: this.unfavoritePlace, setCurrentLocation:this.setCurrentLocation, getPlacesAndDistances: this.getPlacesAndDistances, currentPlace: this.state.currentPlace, isSearching: this.state.isSearching, loadMore: this.loadMorePlaces} )}/>

          <Route path="/profile" component={Auth( ProfileContainer , {onLogout: this.handleLogout, user:this.state.auth.user, allPlaces: this.state.allPlaces, savedPlaces: this.state.auth.user.savedPlaceIDs, displayedPlaces: this.state.auth.user.savedPlaceList, handleCurrentPlaceSelect: this.handleCurrentPlaceSelect, favoritePlace: this.favoritePlace, unfavoritePlace: this.unfavoritePlace})} />
        </div>
      </Router>
    );
  }
}

export default App;
