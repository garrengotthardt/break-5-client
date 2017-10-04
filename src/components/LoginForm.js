import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import { Link} from 'react-router-dom'
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
  }
  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onLogin(this.state)
    this.setState({email: '', password: ''})
  }

  render () {
    console.log(this.state)
    return (
      <div className='pageContent'>
        <Container text>
          <h1>Login</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email</label>
              <input name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
            </Form.Field>
            <Button basic color='black' type='submit'>LOG IN</Button>
            <div >Aren't signed up yet? <Link to='/signup'>Create an account here</Link></div>
          </Form>
        </Container>
      </div>

    )
  }
}

export default LoginForm
