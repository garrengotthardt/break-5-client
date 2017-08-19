import React, {Component} from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import { Container, Button } from 'semantic-ui-react'

class ProfileContainer extends Component {
    render(){
      return(
        <div className='pageContent'>
          <Button onClick={() => this.props.onLogout()}>LogOut</Button>
        </div>
      )
  }
}

export default ProfileContainer
