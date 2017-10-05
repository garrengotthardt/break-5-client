import React, {Component} from 'react'
import ResultsSubNav from './ResultsSubNav'
import SavedPlacesList from './SavedPlacesList'
import { Container, Button } from 'semantic-ui-react'

class ProfileContainer extends Component {
  constructor(props){
    super(props)

  }
  render(){
    return(
      <Container text className='pageContent'>
        <h1>Welcome, {this.props.user.firstName} {this.props.user.lastName}!</h1>
        <Button basic color='black' onClick={() => this.props.onLogout()}>LogOut</Button>

        <h2>— Your Favorites —</h2>
        <SavedPlacesList user={this.props.user} savedPlaces={this.props.savedPlaces} isSearching={this.props.isSearching} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace} allPlaces={this.props.allPlaces.filter(place => this.props.savedPlaces.map(savedPlace => savedPlace.place_id).includes(place.id))}/>
      </Container>
    )
  }
}

export default ProfileContainer
