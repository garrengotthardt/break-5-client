import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item, Button, Loader } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'

class SavedPlacesList extends Component {
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
      return <Button basic color='black' className="blockCentered loadMore" onClick={() => this.loadMore()}>Load More</Button>
    }
  }


  render(){
    return(
      <Container text>
        { this.state.displayedPlaces.length === 0 ?
          <Loader active />
          :
          <div className='resultsListContainer'>
            <hr className='resultsListHr'/>
            {this.state.displayedPlaces.map(place => (<ResultListItem userID={this.props.user.id} place={place} savedPlaces={this.props.savedPlaces} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace}/>))}
          </div>
        }
        { this.displayButton()}
      </Container>
    )
  }
}

export default SavedPlacesList
