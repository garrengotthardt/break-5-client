import React, { Component } from 'react'
import { Container, Button, Divider, Form } from 'semantic-ui-react'
import { Redirect, Link} from 'react-router-dom'

class SignUpForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      redirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSignup(this.state)
    this.setState({
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    })
  }




  handleChange = (event) => {
    // debugger
    let key = `${event.target.name}`
    let value = `${event.target.value}`
    this.setState({
      user: {
        ...this.state.user,
        [key]: value
      }

    })
  }

  render() {
    console.log(this.state.user);
    return (
      <Container>
        {/* {this.state.redirect? <Redirect to="/places/search"/> : null } */}
        <h1>Sign Up</h1>
        <Form id='signup-form' onSubmit={this.handleSubmit}>
          <Form.Field name="first_name" label='First name' control='input' placeholder='First name' onChange={this.handleChange}/>
          <Form.Field name="last_name" label='Last name' control='input' placeholder='Last name'  onChange={this.handleChange}/>
          <Form.Field name="email" label='Email' control='input' placeholder='Email address'  onChange={this.handleChange}/>
          <Form.Input name="password" type="password" label='Enter Password' placeholder='Password' onChange={this.handleChange}/>
          <Form.Input name="password_confirmation" type="password" label='Confirm Password' placeholder='Password confirmation'  onChange={this.handleChange}/>
          <Button type='submit'>Submit</Button>
            Already have an account? <Link to='/login'>Log in here</Link>
          <Divider hidden />
        </Form>
      </Container>
    )
  }
}
export default SignUpForm
