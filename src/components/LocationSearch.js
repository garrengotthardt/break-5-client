import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Container, Button, Checkbox, Form } from 'semantic-ui-react'

class LocationSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.currentLocation,
      redirect: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState ({
      address: nextProps.currentLocation
    })
  }


  onChange = (address) => this.setState({ address })

  handleFormSubmit = (event) => {
    event.preventDefault()

    this.props.setCurrentLocation(this.state.address)
    this.setState({redirect:true})
  }


  render(){
    const inputProps = {
     value: this.state.address,
     onChange: this.onChange,
   }

   const myStyles = {
     googleLogoContainer: {
     display: 'none'
     },
   }

   const options = {
     // location: new google.maps.LatLng(-34, 151),
     // radius: 2000,
     types: ['address']
   }
   console.log('location search state',this.state)
    return(
        <Container text>
          {this.state.redirect? <Redirect to='/places/map'/> : null }
          <h3>Enter your current location:</h3>
          <form onSubmit={this.handleFormSubmit}>
            <PlacesAutocomplete inputProps={inputProps} options={options}  />
            <Button basic color='black' type="submit">Set Location</Button>
          </form>
        </Container>

    )
  }
}

export default LocationSearch
