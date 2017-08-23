import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Container, Button, Input } from 'semantic-ui-react'
import { postNewItem } from '../apiAdapter'


class AddNewMenuItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      showMenuItemForm: false,
      selectedEstablishment: {
        name: '',
        address: '',
        lat: null,
        long: null,
        google_places_id: '',
        newMenuItem: {
          name: '',
          category: 'misc. food'
        },
        newMenuItemVariations: {
          variation: '',
          price: null
        }
      },
      shouldRedirect: false,
      newlyCreatedEstID: null,
    }
  }



  // AUTCOMPLETE FORM FUNCTIONS
  onAddressChange = (address) => this.setState({ address })

  handleEstablishmentSelect = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
    .then(results => {
      this.setState({
        selectedEstablishment:{
          ...this.state.selectedEstablishment,
          name: this.state.address.split(',')[0],
          address: results[0].formatted_address,
          google_places_id: results[0].place_id
        },
        showMenuItemForm: true
      })
      //ADD POST REQUEST TO DATABASE TO UPDATE CURRENT USER ADDRESS
      return getLatLng(results[0])
    })
    .then(latLng => this.setState({
      selectedEstablishment:{
        ...this.state.selectedEstablishment,
        lat: latLng.lat,
        long: latLng.lng
      }

      //ADD POST REQUEST TO DATABASE TO UPDATE CURRENT USER LAT/LONG
    }))
  }

  // MENU ITEM FORM FUNCTIONS

  onMenuItemChange = (event) => {
    let key = `${event.target.name}`
    let value = `${event.target.value}`
    console.log("event", event)
    console.log("key",key)
    console.log("value",value)
    this.setState({
      selectedEstablishment: {
        ...this.state.selectedEstablishment,
        newMenuItem: {
          ...this.state.selectedEstablishment.newMenuItem,
          [key]: value
        }
      }

    })
  }

  onMenuItemVariationChange = (event) => {
    let key = `${event.target.name}`
    let value = `${event.target.value}`
    this.setState({
      selectedEstablishment: {
        ...this.state.selectedEstablishment,
        newMenuItemVariations: {
          ...this.state.selectedEstablishment.newMenuItemVariations,
          [key]: value
        }
      }

    })
  }

  handleAddItem = (event) => {
    event.preventDefault()
    postNewItem(this.state.selectedEstablishment)
    .then(res => {
      this.setState({
        newlyCreatedEstID: res.placeID,
        shouldRedirect: true
      })

      this.props.getPlacesAndDistances()
    })
    // .then(() => this.props.handlePost()) PASS UP TO APP TO REFETCH ALL RESTAURANTS/MENU ITEMS FOR STATE
  }



  render(){
    console.log(this.state)

    const inputProps = {
     value: this.state.address,
     onChange: this.onAddressChange,
    }

    const options = {
      // location: new google.maps.LatLng(-34, 151),
      // radius: 2000,
      types: ['establishment']
    }

    const myStyles = {
      googleLogoContainer: {
      display: 'none'
      },
    }
   const establishmentSelect = (<div>
     <h3>Find the establishment for which you'd like to add a menu item:</h3>
     <form onSubmit={this.handleEstablishmentSelect}>
       <PlacesAutocomplete  inputProps={inputProps} options={options} styles={myStyles} />
       <Button basic color='black' type="submit">Next</Button>
     </form>
   </div>
   )



   const menuItemForm = (<div><h3>Add menu items for {this.state.address}:</h3>
       <form onSubmit={this.handleAddItem}>
         <div className='formInlineGroup'>
          <input className='formGroup2ChildL60' label='Item Name' placeholder='Enter Item Name' name="name" width={7} onChange={this.onMenuItemChange} />

          <select className='formGroup2ChildR40' name="category" placeholder="choose a category" onChange={this.onMenuItemChange} defaultValue='misc. food'>
             <option value='misc. food'>Misc. Food</option>
             <option value='misc. beverages'>Misc. Beverages</option>
          </select>
        </div>
        <div className='formInlineGroup'>
          <input className='formGroup2ChildL60' label='Item Size (optional)' placeholder='Item Size (optional)' name="variation" width={4} onChange={this.onMenuItemVariationChange} />
          <input className='formGroup2ChildR40'label='Price' type='number' min='0' max='5' step='any' placeholder='price' name='price' width={3} onChange={this.onMenuItemVariationChange}/>
        </div>

        {/* <Button basic color='black' size='mini' disabled onClick={this.addAdditionalPrice}>Add Variation</Button> */}
        <Button basic color='black' type='submit'>Add Item</Button>
      </form>
  </div>
   )

    return(
      <Container text>
        {this.state.shouldRedirect ? <Redirect to={`/places/${this.state.newlyCreatedEstID}`}/> : null }
        { this.state.showMenuItemForm ? menuItemForm : establishmentSelect }
      </Container>
    )
  }
}

export default AddNewMenuItem
