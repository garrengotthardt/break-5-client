import React, { Component } from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import ResultsMap from './ResultsMap'
import LocationSearch from './LocationSearch'
import AddNewMenuItem from './AddNewMenuItem'
import PlaceContainer from './PlaceContainer'
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';


class ResultsContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
     console.log("results container")
    return(
      <div>
        <ResultsSubNav handleResultsDisplayChange={this.handleResultsDisplayChange}/>
        <div className="pageContent">
          <Switch>
            <Route path="/places/map" render={() => <ResultsMap user={this.props.user} allPlaces={this.props.allPlaces}  />}/>

            <Route path="/places/list" render={() => <ResultsList user={this.props.user} allPlaces={this.props.allPlaces} />}/>

            <Route path="/places/search" render={() => <LocationSearch currentLocation={this.props.user.address} setCurrentLocation={this.props.setCurrentLocation} />}/>

            <Route path="/places/new" component={AddNewMenuItem}/>

            <Route path="/places/:id" component={PlaceContainer}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default ResultsContainer
