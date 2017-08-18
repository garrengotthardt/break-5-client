import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Item } from 'semantic-ui-react'

const ResultsList = (props) => {
  return(
    <div>
      <p>Displaying Results Near: {props.user.address}</p>
      <Item.Group divided>
        {props.allPlaces.map(place => (<ResultListItem place={place} handleCurrentPlaceSelect={props.handleCurrentPlaceSelect}/>))}
      </Item.Group>
    </div>
  )
}

export default ResultsList
