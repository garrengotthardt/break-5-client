import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'


class NavBar extends Component {
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
          <NavLink to="/nearby">
          <h3 className='mainNavItem'>Places</h3>
          </NavLink>
        </Grid.Column>
        <Grid.Column width={8}>
          <h3 className='mainNavItem'>Logo</h3>
        </Grid.Column>
        <Grid.Column>
          <NavLink  className='mainNavItem' to="/favorites" ><h3 className='mainNavItem'>Favorites</h3></NavLink>
        </Grid.Column>
      </Grid>


    )}
}

export default NavBar
