import React from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const CurrentLocationLabel = (props) => {
  return(
    <Container>
      <h1 className='homeHeader'>Welcome to Break5</h1>
      <Link to='/login'><Button basic color='black' type='submit'>Log In</Button></Link>
      <Link to='/signup'><Button basic color='black' type='submit'>Sign Up</Button></Link>
      <Button basic color='gray' type='submit'>Demo</Button>
    </Container>
  )
}

export default CurrentLocationLabel
