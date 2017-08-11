import React from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'

const PlaceContainer = (props) => {
    return(
      <div>
        {props.currentPlace.name}
      </div>
    )
}

export default PlaceContainer
