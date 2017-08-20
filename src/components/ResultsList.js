import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'

class ResultsList extends Component {
  constructor(props){
    super(props)

    this.state = {
      allPlaces: []
    }
  }

  componentDidMount(){
    this.setState({
      allPlaces: this.props.allPlaces
    })
  }


  render(){
    console.log("rendering places")
    return(
      <Container text>
        {/* <CurrentLocationLabel currentLocation={this.props.user.address} style={{margin:'0 auto'}}/> */}
        { this.state.allPlaces.length === 0 ?
          <h2>Loading</h2>
          :
        <Item.Group divided>
          {this.state.allPlaces.map(place => (<ResultListItem place={place}/>))}
        </Item.Group>

        }

      </Container>
    )
  }
}

export default ResultsList
