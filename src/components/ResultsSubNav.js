import React, { Component } from 'react';
import {Container, Row, Col} from 'react-grid-system'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

class ResultsSubNav extends Component {
  constructor(props){
    super(props)

    // state = {
    //
    // }
  }

  render(){

    return(
      <Grid columns='equal'>
        <Grid.Column>
          <Link to="/search">
            <h5 className='mainNavItem'>Search</h5>
          </Link>
        </Grid.Column>
        <Grid.Column width={8}>
          <h5 className='mainNavItem'><span onClick={() => this.props.handleResultsDisplayChange()}>List</span> / <span name='map' onClick={() => this.props.handleResultsDisplayChange()}>Map</span></h5>

        </Grid.Column>
        <Grid.Column>
          <Link to="/new">
            <h5 className='mainNavItem'>New</h5>
          </Link>
        </Grid.Column>
      </Grid>

    )}
}

export default ResultsSubNav
