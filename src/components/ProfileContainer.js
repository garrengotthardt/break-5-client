import React, {Component} from 'react'
import ResultsSubNav from './ResultsSubNav'
import List from './List'
import { Container, Button, Loader } from 'semantic-ui-react'

class ProfileContainer extends Component {
  constructor(props){
    super(props)

  }


  render(){
    return(
      <Container text className='pageContent'>
        <h1>Welcome, {this.props.user.firstName}!</h1>
        <Button basic color='black' onClick={() => this.props.onLogout()}>LogOut</Button>

        <h2>— Your Favorites —</h2>
        {this.props.allPlaces.length > 0 ?
          <List user={this.props.user} savedPlaces={this.props.savedPlaces} displayedPlaces={this.props.displayedPlaces} remainingPlaces={this.props.remainingPlaces} loadMore={this.props.loadMore} isSearching={this.props.isSearching} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace} />
          :
          <Loader active />
        }

      </Container>
    )
  }
}

export default ProfileContainer
