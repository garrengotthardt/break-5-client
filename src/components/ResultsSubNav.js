import React, { Component } from 'react';
import { NavLink } from  'react-router-dom'
import { Container, Grid, Icon, Button } from 'semantic-ui-react'

class ResultsSubNav extends Component {
  constructor(props){
    super(props)
  }

  render(){

    return(
      <Container className='subNavContainer'>
        <Grid className='subNav' columns='equal'>

          <Grid.Column textAlign='right'>
            <NavLink to="/places/search">
              <Icon className='subNavIcon' name='search' />
            </NavLink>
          </Grid.Column>

          <Grid.Column width={6}>
            <Button.Group size='small' className='subNavButtons'>
              <NavLink to='/places/map'>
              <Button basic color='black' className='subNavButtonL' size='large'>MAP</Button></NavLink>

              <NavLink to='/places/list'><Button basic color='black' className='subNavButtonR' size='tiny'>LIST</Button></NavLink>
            </Button.Group>
          </Grid.Column>

          <Grid.Column textAlign='left'>
            <NavLink to="/places/new">
                <Icon className='subNavIcon' name='plus' />
            </NavLink>
          </Grid.Column>

        </Grid>
      </Container>
    )}
}

export default ResultsSubNav
