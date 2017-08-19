import React, { Component } from 'react';
import { NavLink } from  'react-router-dom'
import { Container, Grid, Icon, Button } from 'semantic-ui-react'

class ResultsSubNav extends Component {
  constructor(props){
    super(props)

    // state = {
    //
    // }
  }

  render(){

    return(
      <Container>
        <Grid className='subNav' columns='equal'>
          <Grid.Column>
            <NavLink to="/places/search">
              <Icon className='subNavIcon' name='search' size='large'  />
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>

            <Button.Group size='small' className='subNavButton'>
              <NavLink to='/places/map'><Button basic color='black' size='small'>Map</Button></NavLink>
              <NavLink to='/places/list'><Button basic color='black' size='small'>List</Button></NavLink>
            </Button.Group>

          </Grid.Column>
          <Grid.Column>
            <NavLink to="/places/new">
              <Icon.Group className='subNavIcon' size='large'>
                <Icon name='food' />
                <Icon corner name='add' />
              </Icon.Group>
            </NavLink>
          </Grid.Column>
        </Grid>
      </Container>
    )}
}

export default ResultsSubNav
