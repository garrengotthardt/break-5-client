import React, { Component } from 'react'
import ResultsSubNav from './ResultsSubNav'
import ResultsList from './ResultsList'
import ResultsMapContainer from './ResultsMapContainer'
import LocationSearch from './LocationSearch'
import AddNewMenuItem from './AddNewMenuItem'
import PlaceContainer from './PlaceContainer'
import NotFound from './NotFound'
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';


class ResultsContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <ResultsSubNav/>
        <div className="pageContent">
          <Switch>
            <Route path="/places/map" render={() => <ResultsMapContainer user={this.props.user} allPlaces={this.props.allPlaces} savedPlaces={this.props.savedPlaces} isSearching={this.props.isSearching} />}/>

            <Route path="/places/list" render={() => <ResultsList user={this.props.user} allPlaces={this.props.allPlaces} displayedPlaces={this.props.displayedPlaces} remainingPlaces={this.props.remainingPlaces} savedPlaces={this.props.savedPlaces} isSearching={this.props.isSearching} favoritePlace={this.props.favoritePlace} unfavoritePlace={this.props.unfavoritePlace} loadMore={this.props.loadMore} />}/>

            <Route path="/places/search" render={() => <LocationSearch currentLocation={this.props.user.address} setCurrentLocation={this.props.setCurrentLocation} />}/>

            <Route path="/places/new" render={() => <AddNewMenuItem getPlacesAndDistances={this.props.getPlacesAndDistances}/>}/>

            <Route path="/places/:id" component={PlaceContainer}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default ResultsContainer
