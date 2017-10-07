import React, {Component} from 'react'
import List from './List'
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
          <List displayedPlaces={this.props.displayedPlaces} user={this.props.user} savedPlaces={this.props.savedPlaces} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace}/>
        }
        { this.displayButton()}
      </Container>
    )
  }
}

export default ResultsList
