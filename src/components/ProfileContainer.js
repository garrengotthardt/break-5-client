import React, {Component} from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import { Container, Button } from 'semantic-ui-react'

class ProfileContainer extends Component {
    render(){
      return(
        <Container text className='pageContent'>
          <Button basic color='black' onClick={() => this.props.onLogout()}>LogOut</Button>
        </Container>
      )
  }
}

export default ProfileContainer
