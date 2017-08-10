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
          <h5 className='mainNavItem'><Link to="/">List</Link> / <Link to="/list/map">Map</Link></h5>

        </Grid.Column>
        <Grid.Column>
          <Link to="/newListing">
            <h5 className='mainNavItem'>New</h5>
          </Link>
        </Grid.Column>
      </Grid>

    )}
}

export default ResultsSubNav
