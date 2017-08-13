import React, { Component } from 'react';
import {Container, Row, Col} from 'react-grid-system'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { NavLink } from  'react-router-dom'

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
          <NavLink to="/places/search">
            <h5 className='mainNavItem'>Search</h5>
          </NavLink>
        </Grid.Column>
        <Grid.Column width={8}>
          <h5 className='mainNavItem'><NavLink to='/places/map'>Map</NavLink> / <NavLink to='/places/list'>List</NavLink> </h5>

        </Grid.Column>
        <Grid.Column>
          <NavLink to="/places/new">
            <h5 className='mainNavItem'>New</h5>
          </NavLink>
        </Grid.Column>
      </Grid>

    )}
}

export default ResultsSubNav
