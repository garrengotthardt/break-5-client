import React, {Component} from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import { Button } from 'semantic-ui-react'

class ProfileContainer extends Component {
    render(){
      return(
        <div>
          <Button onClick={() => this.props.onLogout()}>LogOut</Button>
        </div>
      )
  }
}

export default ProfileContainer
