import React, { Component } from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import ResultsMap from './ResultsMap'
import { Route, NavLink, Redirect } from 'react-router-dom';


class ResultsContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      showList: true
    }
  }

  // handleResultsDisplayChange = (option) => {
  //   if (option === 'list' && this.state.showList === false) {
  //     this.setState({
  //       showList: true
  //     })
  //   } else {
  //     this.setState({
  //       showList: false
  //     })
  //   }
  // }

  render(){
    console.log(this.props)
    return(
      <div>
        <ResultsSubNav handleResultsDisplayChange={this.handleResultsDisplayChange}/>

        {/* {this.state.showList ?
          <ResultsList currentAddress={this.props.currentAddress} allPlaces={this.props.allPlaces} handleCurrentPlaceSelect={this.props.handleCurrentPlaceSelect}/>
          :
          <ResultsMap currentAddress={this.props.currentAddress} currentUserLat={this.props.currentLat} currentUserLong={this.props.currentLong} allPlaces={this.props.allPlaces} handleCurrentPlaceSelect={this.props.handleCurrentPlaceSelect} />} */}

      </div>
    )
  }
}

export default ResultsContainer
