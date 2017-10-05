import React, {Component} from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import { Container, Button } from 'semantic-ui-react'

class ProfileContainer extends Component {
  constructor(props){
    super(props)

  }
  render(){
    console.log(this.props)
    return(
      <Container text className='pageContent'>
        <h1>Welcome, {this.props.user.firstName}!</h1>
        <Button basic color='black' onClick={() => this.props.onLogout()}>LogOut</Button>

        <h2>— Your Favorites —</h2>
        <ResultsList user={this.props.user} savedPlaces={this.props.savedPlaces} displayedPlaces={this.props.displayedPlaces} remainingPlaces={this.props.remainingPlaces} loadMore={this.props.loadMore} isSearching={this.props.isSearching} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace} allPlaces={this.props.allPlaces.filter(place => this.props.savedPlaces.map(savedPlace => savedPlace.place_id).includes(place.id))}/>
      </Container>
    )
  }
}

export default ProfileContainer
