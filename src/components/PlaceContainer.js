import React, { Component } from 'react'
import { Container, List } from 'semantic-ui-react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import MenuSection from './MenuSection'
import { getPlace } from '../apiAdapter'

class PlaceContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: window.location.pathname.slice(8),
      name: '',
      address: '',
      menuItems: [],
      categories: [],
      google_places_id: ''
    }

  }

  componentDidMount(){
    getPlace(this.state.id)
    .then(placeData => this.setState({
      name: placeData.name,
      address: placeData.address,
      categories: Array.from(new Set(placeData.menu_items.map( item => item.category))).reverse(),
      menuItems: placeData.menu_items,
      google_places_id: placeData.google_places_id
    }) )
  }



  render(){
      return(
      <Container text>

        <h1>{this.state.name}</h1>
        <h5>{this.state.address}</h5>

        <h3>Menu Items Under $5:</h3>

        <List as='ol'>
          {this.state.categories.map(category =>  <MenuSection category={category} menuItems={this.state.menuItems.filter(item =>  item.category === category)} />)}
        </List>

      </Container>
    )
  }
}

export default PlaceContainer
