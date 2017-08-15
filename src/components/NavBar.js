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
          <NavLink to="/places/map">
          <h3 className='mainNavItem'>Places</h3>
          </NavLink>
        </Grid.Column>
        <Grid.Column width={8}>
          <h3 className='mainNavItem'>Logo</h3>
        </Grid.Column>
        <Grid.Column>
          <NavLink  className='mainNavItem' to="/profile" ><h3 className='mainNavItem'>Profile</h3></NavLink>
        </Grid.Column>
      </Grid>


    )}
}

export default NavBar
