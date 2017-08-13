import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import MenuItem from './MenuItem'


class PlaceContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: window.location.pathname.slice(8),
      name: this.props.currentPlace.name,
      address: this.props.currentPlace.address,
      menuItems: [],
      google_places_id: this.props.currentPlace.google_places_ids
    }

  }

  componentWillMount(){
    let currentID = window.location.pathname.slice(8)
    fetch(`http://localhost:3000/api/v1/places/${this.state.id}`)
    .then(data => data.json())
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
