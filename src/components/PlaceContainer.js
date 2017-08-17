import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import MenuItem from './MenuItem'
import { getPlace } from '../apiAdapter'

class PlaceContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: window.location.pathname.slice(8),
      name: '',
      address: '',
      menuItems: [],
      google_places_id: ''
    }

  }

  componentWillMount(){
    let currentID = window.location.pathname.slice(8)
    getPlace(currentID)
    .then(placeData => this.setState({
      name: placeData.name,
      address: placeData.address,
      menuItems: placeData.menu_items,
      google_places_id: placeData.google_places_id
    }) )
  }



  render(){
    console.log("place container ", this.state)
      return(
      <div>
        <h1>{this.state.name}</h1>
        <h5>{this.state.address}</h5>

        <h3>Menu Items Under $5:</h3>

        <List as='ol'>
          { this.state.menuItems.map(item => (<MenuItem item={item}/>))}
        </List>

      </div>
    )
  }
}

export default PlaceContainer
