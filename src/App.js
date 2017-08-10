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
        userEmail: ''
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

  isLoggedIn = () => !!window.localStorage.jwt

  componentDidMount(){
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
      .then(res => this.setState({
          auth: {
           userEmail: res.email
          },
        })
      )


      fetch('http://localhost:3000/api/v1/users')
       .then(data => data.json())
       .then(users => users.filter(user => user.email === this.state.auth.userEmail))
       .then(currentUser => console.log("currentUser after fetch", currentUser)
      //    this.setState({
      //    currentLat: currentUser.lat,
      //    currentLong: currentUser.long,
      //    currentAddress: currentUser.address
      //  })
     )

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
              userEmail: res.email
            }
          })
          // this.context.router.history.push('/nearby')
        }
        //if error render login again
        //else set the jwt token and forward user to /giphs
      })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        userEmail: ''
      }
    })
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
    console.log(this.state.auth.userEmail)
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar}/>
          <Route path='/login' render={()=> this.isLoggedIn() ? <Redirect to="/nearby"/> : <LoginForm onLogin={this.handleLogin}/> } />
          <Route exact path="/nearby" render={()=> !this.isLoggedIn() ? <Redirect to="/login"/> : <ResultsContainer currentAddress={this.state.currentAddress}/>}/>
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
