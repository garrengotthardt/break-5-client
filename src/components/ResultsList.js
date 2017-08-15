import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Item } from 'semantic-ui-react'

class ResultsList extends Component {
  render(){
    return(
      <div>
      <p>Displaying Results Near: {this.props.address}</p>
      <Item.Group divided>
        {this.props.allPlaces.map(place => (<ResultListItem place={place} handleCurrentPlaceSelect={this.props.handleCurrentPlaceSelect}/>))}
      </Item.Group>
    </div>
    )
  }
}

export default ResultsList
