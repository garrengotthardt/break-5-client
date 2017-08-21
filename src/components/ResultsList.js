import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item, Button, Loader } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'

class ResultsList extends Component {
  constructor(props){
    super(props)

    this.state = {
      displayedPlaces: this.props.allPlaces.slice(0,10),
      remainingPlaces: this.props.allPlaces.slice(11,-1)
    }
  }




  loadMore = () => {
    if (this.state.remainingPlaces.length >= 10){
      this.setState({
        displayedPlaces: this.state.displayedPlaces.concat(this.state.remainingPlaces.splice(0,10))
      })
    } else if (this.state.remainingPlaces.length < 10 && this.state.remainingPlaces.length < 10) {
      this.setState({
        displayedPlaces: this.state.displayedPlaces.concat(this.state.remainingPlaces),
        remainingPlaces: []
      })
    }
  }

  displayButton = () => {
    if (this.state.remainingPlaces.length > 0) {
      return <Button basic color='black' className="blockCentered" onClick={() => this.loadMore()}>Load More</Button>
    }
  }


  render(){
    return(
      <Container text>
        <CurrentLocationLabel currentLocation={this.props.user.address}/>
        { this.state.displayedPlaces.length === 0 ?
          <Loader active />
          :
          <div className='resultsListContainer'>
            {this.state.displayedPlaces.map(place => (<ResultListItem place={place}/>))}
          </div>
        }
        { this.displayButton()}
      </Container>
    )
  }
}

export default ResultsList
