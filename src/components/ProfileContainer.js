import React from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import { Button } from 'semantic-ui-react'

const ProfileContainer = (props) => {
    console.log(props)
    return(
      <div>
        <Button onClick={() => props.onLogout()}>LogOut</Button>
      </div>
    )
}

export default ProfileContainer
