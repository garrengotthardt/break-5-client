import React from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'

const ResultsContainer = (props) => {
    console.log(props)
    return(
      <div>
        <ResultsSubNav />
        <ResultsList currentAddress={props.currentAddress}/>
      </div>
    )
}

export default ResultsContainer
