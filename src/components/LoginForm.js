import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class LoginForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state.email)
  }
  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onLogin(this.state)
    this.setState({email: '', password: ''})
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input name='email' placeholder='Email' onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit'>Log In</Button>
      </Form>

    )
  }
}

export default LoginForm
