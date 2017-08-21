import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Container, Grid, Image, Icon } from 'semantic-ui-react'


const NavBar = () => {
    return(
      <div>
        <div className='clearNav'></div>
        <div className='mainNav'>
          <Grid columns='equal' className='mainNavGrid'>
            <Grid.Column>
              <NavLink to="/places" className='mainNavItem' activeStyle={{ color: '#000'}}>
                <Icon className="mainNavIcon" name='map outline' size='large'  />
              </NavLink>
            </Grid.Column>
            <Grid.Column width={8}>
              <Image id='mainNavLogo' src='/break5logo_black_v2.svg' />
            </Grid.Column>
            <Grid.Column>
              <NavLink  className='mainNavItem' to="/profile" activeStyle={{ color: '#000'}}>
                <Icon className="mainNavIcon"  name='user outline' size='large'  />
              </NavLink>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
}

export default NavBar
