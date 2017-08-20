import React from 'react'
import { Label, Icon } from 'semantic-ui-react'


const CurrentLocationLabel = (props) => {
    return(
      <Label size="large">
        <Icon name='marker' /> Displaying Results Near: {props.currentLocation}
      </Label>
    )
}

export default CurrentLocationLabel
