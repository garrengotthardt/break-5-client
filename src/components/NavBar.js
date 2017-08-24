import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Container, Grid, Image, Icon } from 'semantic-ui-react'


class NavBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      showBackButton: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location !== this.props.location && !!parseInt(window.location.pathname.slice(8))) {
      this.setState({
        showBackButton: true
      })
    } else {
      this.setState({
        showBackButton: false
      })
    }
  }

  render(){
    return(
      <div>
        <div className='mainNav'>
          <Grid columns='equal' className='mainNavGrid'>
            <Grid.Column>
              { this.state.showBackButton ?
                <div onClick={() => this.props.history.goBack()} className="mainNavItem" >
                  <Icon className='subNavIcon' name='angle left' size='big' color='black' size='big' />
                </div>
                :
                <NavLink to="/places" className='mainNavItem' activeStyle={{ color: '#000'}}>
                  <Icon className="mainNavIcon" name='map outline' size='large'  />
                </NavLink>
              }
            </Grid.Column>
            <Grid.Column width={8}>
              <NavLink to="/places" >
              <Image id='mainNavLogo' src='/break5logo_black_v2.svg' />
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink  className='mainNavItem' to="/profile" activeStyle={{ color: '#000'}}>
                <Icon className="mainNavIcon"  name='user outline' size='large'  />
              </NavLink>
            </Grid.Column>
          </Grid>
        </div>
        <div className='clearNav'></div>
      </div>
    )
  }
}

export default NavBar
