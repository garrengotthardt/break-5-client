import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'

const ResultsList = (props) => {
  return(
    <Container>
      <CurrentLocationLabel currentLocation={props.user.address}/>
      <Item.Group divided>
        {props.allPlaces.map(place => (<ResultListItem place={place} handleCurrentPlaceSelect={props.handleCurrentPlaceSelect}/>))}
      </Item.Group>
    </Container>
  )
}

export default ResultsList
