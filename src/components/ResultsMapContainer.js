import React from 'react'
import { Container, Label, Icon, Loader, Dimmer } from 'semantic-ui-react'
import CurrentLocationLabel from './CurrentLocationLabel'
import ResultsMap from './ResultsMap'


const ResultsMapContainer = (props) => {

    console.log("results map props",props)
    return(
        <Container>
        { props.allPlaces.length == 0 ?
          <Loader active/>
          :
          <div>
          <CurrentLocationLabel currentLocation={props.user.address} isSearching={props.isSearching}/>
          <ResultsMap user={props.user} allPlaces={props.allPlaces}/>
          </div>
        }
      </Container>
    );
}

export default ResultsMapContainer
