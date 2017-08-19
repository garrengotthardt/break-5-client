import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item } from 'semantic-ui-react'

const ResultsList = (props) => {
  return(
    <div>
      <Container className='pageContent'>
      <p>Displaying Results Near: {props.user.address}</p>
      <Item.Group divided>
        {props.allPlaces.map(place => (<ResultListItem place={place} handleCurrentPlaceSelect={props.handleCurrentPlaceSelect}/>))}
      </Item.Group>
    </Container>
    </div>
  )
}

export default ResultsList
