import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'

class ResultsList extends Component {
  constructor(props){
    super(props)
    
  }
  render(){
    return(
      <Container text>
        <CurrentLocationLabel currentLocation={this.props.user.address} style={{margin:'0 auto'}}/>
        <Item.Group divided>
          {this.props.allPlaces.map(place => (<ResultListItem place={place} />))}
        </Item.Group>
      </Container>
    )
  }
}

export default ResultsList
