import React, { Component } from 'react';
import { Link, NavLink } from  'react-router-dom'
import { Container, Grid, Icon, Button } from 'semantic-ui-react'

const ResultsSubNav = () => {
  return(
    <Container className='subNavContainer'>
      { !parseInt(window.location.pathname.slice(8)) ?
        <Grid className='subNav' columns='equal'>
          <Grid.Column textAlign='right'>
            <NavLink to="/places/search" className="subNavItem"  activeStyle={{ color: '#000'}}>
              <Icon className='subNavIcon' name='search' />
            </NavLink>
          </Grid.Column>
          <Grid.Column width={6}>
            <div size='small' className='subNavButtons'>
              <NavLink to='/places/map' className="subNavItem subNavButtonL"  activeClassName='subNavButtonsActive'>MAP</NavLink>
              <NavLink to='/places/list' className="subNavItem subNavButtonR" activeClassName='subNavButtonsActive'>LIST</NavLink>
            </div>
          </Grid.Column>
          <Grid.Column textAlign='left'>
            <NavLink to="/places/new" className="subNavItem" activeStyle={{ color: '#000'}} >
                <Icon className='subNavIcon' name='plus' />
            </NavLink>
          </Grid.Column>
        </Grid>
        :
        null
      }
    </Container>
  )
}

export default ResultsSubNav
