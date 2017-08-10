import React from 'react'

const ResultsList = (props) => {
    console.log(props)
    return(
      <div>
        <ul>
          <p>Displaying Results Near: {props.currentAddress}</p>
          <li>
            place 1
          </li>
          <li>
            place 2
          </li>
          <li>
            place 3
          </li>
          <li>
            place 4
          </li>
          <li>
            place 5
          </li>
          <li>
            place 6
          </li>

        </ul>
        {/* <ResultsListItem /> */}
      </div>
    )
}

export default ResultsList
