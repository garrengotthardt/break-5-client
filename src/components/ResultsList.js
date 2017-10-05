import React, {Component} from 'react'
import ResultListItem from './ResultListItem'
import { Container, Item, Button, Loader } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'

class ResultsList extends Component {
  constructor(props){
    super(props)
  }




  displayButton = () => {
    if (this.props.remainingPlaces.length > 0) {
      return <Button basic color='black' className="blockCentered loadMore" onClick={() => this.props.loadMore()}>Load More</Button>
    }
  }


  render(){

    return(
      <Container text>

        <CurrentLocationLabel currentLocation={this.props.user.address} isSearching={this.props.isSearching}/>

        { this.props.displayedPlaces.length === 0 ?
          <Loader active />
          :
          <div className='resultsListContainer'>
            <hr className='resultsListHr'/>
            {this.props.displayedPlaces.map(place => (<ResultListItem userID={this.props.user.id} place={place} savedPlaces={this.props.savedPlaces} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace}/>))}
          </div>
        }
        { this.displayButton()}
      </Container>
    )
  }
}

export default ResultsList
