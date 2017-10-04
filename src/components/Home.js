import React from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = (props) => {
  return(
    <Container>
      <img id='homeMap' src='/home_map_rectangle.png'/>
      <h1 id='homeHeader'>Welcome to Break5</h1>
      <p id='homeBody'>Looking for a quick bite between meetings on a budget? Break5 helps you find establisments near you with options under $5</p>

      <div id='loginSignupButtons'>
        <Link to='/login'><Button className='homeButton' basic color='black' type='submit'>Log In</Button></Link>

        <Link to='/signup'><Button className='homeButton' basic color='black' type='submit'>Sign Up</Button></Link>
      </div>

      <Button className='demoButton' basic color='gray' type='submit' onClick={() => props.onLogin({email: "demo@demo.com", password: "123456"})}>Demo</Button>
    </Container>
  )
}

export default Home
