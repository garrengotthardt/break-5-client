import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Container, Grid, Image, Icon } from 'semantic-ui-react'


class NavBar extends Component {
  constructor(props){
    super(props)

    // state = {
    //
    // }
  }

  render(){

    return(
      <div  className='mainNav'>
        <Container>
        <Grid columns='equal' className='mainNavGrid'>
          <Grid.Column>
            <NavLink to="/places/map">
            <Icon className="mainNavIcon" name='map outline' size='large'  />
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image id='mainNavLogo' src='/break5logo_black.svg' />
          </Grid.Column>
          <Grid.Column>
            <NavLink  className='mainNavItem' to="/profile" >
            <Icon className="mainNavIcon"  name='user outline' size='large'  />
          </NavLink>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
    )}
}

export default NavBar
