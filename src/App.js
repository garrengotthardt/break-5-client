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
      currentPlaces: [],
      users: [],
      currentUserSaves: [],
      selectedPlace: {},

    }
  }

  isLoggedIn = () => !!window.localStorage.jwt

  componentWillMount(){
    console.log("setting id")
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
      .then(res => this.setState({
          auth: {
           userID: res.id,
           currentLat: res.lat,
           currentLong: res.long,
           currentAddress: res.address
          },
        })
      )
    }
  }

  setCurrentUserDetails = () => {
  //   fetch(`http://localhost:3000/api/v1/users`)
  //    .then(data => data.json())
  //    .then(users => users.filter(user => user.id === this.state.auth.userID))
  //    .then(currentUser =>  this.setState({
  //      currentLat: currentUser[0].lat,
  //      currentLong: currentUser[0].long,
  //      currentAddress: currentUser[0].address
  //    })
  //  )
   fetch(`http://localhost:3000/api/v1/users/${this.state.auth.userID}`)
    .then(data => data.json())
    .then(currentUser => this.setState({
        currentLat: currentUser.lat,
        currentLong: currentUser.long,
        currentAddress: currentUser.address
      })
    )
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

      //ADD POST REQUEST TO DATABASE TO UPDATE CURRENT USER LAT/LONG
    }))

  }





  render() {
    console.log(this.state.auth.userID)
    this.state.auth.userID !== null && this.state.currentAddress === '' ? this.setCurrentUserDetails() : null
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar}/>
          <Route path='/login' render={()=> this.isLoggedIn() ? <Redirect to="/nearby"/> : <LoginForm onLogin={this.handleLogin}/> } />
          <Route exact path="/nearby" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> : <ResultsContainer currentAddress={this.state.auth.currentAddress}/>}/>
          <Route exact path="/search" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> :<LocationSearch setCurrentLocation={this.setCurrentLocation}/>} />
          <Route exact path="/profile" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> :<ProfileContainer onLogout={this.handleLogout}/>} />
          {/* <Route path="/" component={}/>
          <Route path="/" component={}/>
          <Route path="/" component={}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
