import React, { Component } from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { getPlace } from '../apiAdapter'
import Menu from './Menu'


class PlaceContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: window.location.pathname.slice(8),
      name: '',
      address: '',
      menuItems: [],
      categories: [],
      google_places_id: '',
      menuIsLoading: true
    }

  }

  componentDidMount(){
    getPlace(this.state.id)
    .then(placeData => this.setState({
      name: placeData.name,
      address: placeData.address,
      categories: Array.from(new Set(placeData.menu_items.map( item => item.category))).reverse(),
      menuItems: placeData.menu_items,
      google_places_id: placeData.google_places_id,
      menuIsLoading: false
    }) )
  }


  componentWillUnmount(){
    console.log("unmounting")
  }

  render(){
    console.log("place container state", this.state )
      return(
      <Container text>
        {this.state.menuIsLoading ?
          <Loader active/>
          :
          <Menu name={this.state.name} address={this.state.address} categories={this.state.categories} menuItems={this.state.menuItems}/>
        }
      </Container>
    )
  }
}

export default PlaceContainer
