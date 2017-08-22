import React from 'react'
import { Label, Icon, Loader } from 'semantic-ui-react'


const CurrentLocationLabel = (props) => {
    return(
        <Label size="large" style={{width: '100%',  display: 'flex', alignItems : 'center'}}>
            { props.isSearching ? <Loader active inline size='tiny' style={{display: 'inline-block', margin: '0 5px 0 0', width: '25px'}}/> : <div style={{display: 'inline-block', width:'25px'}}><Icon name='marker' /></div>}
              <div style={{display: 'inline-block', width: '90%'}}>Displaying results near: {props.currentLocation}</div>
        </Label>
    )
}

export default CurrentLocationLabel
