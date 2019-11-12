import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { addUserMutation, getUserToken } from '../queries/queries'
import { handleLoginUser } from '../actions/users'
import { hashToArray } from '../utils/helpers'

class Register extends Component {
  state = {
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    roles: '',
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }
  isDisabled = () => {
    const { first, last, username, email, password } = this.state

    return first === ''
      || last === ''
      || username === ''
      || email === ''
      || password === ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log('I am logging in')
    this.props.history.push('/')
    this.props.dispatch(handleLoginUser(this.props.client, this.state))
  }

render() {
  const { first, last, username, email, password, roles } = this.state
    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>Create an Account</h3>
        <label className='label' htmlFor='first'>First Name</label>
        <input
          value={first}
          onChange={this.handleInputChange}
          name='first'
          className='input'
          id='first'
          type='text'
        />
        <label className='label' htmlFor='last'>Last Name</label>
        <input
          value={last}
          onChange={this.handleInputChange}
          name='last'
          className='input'
          id='last'
          type='text'
        />
        <label className='label' htmlFor='email'>Email</label>
        <input
          value={email}
          onChange={this.handleInputChange}
          name='email'
          className='input'
          id='email'
          type='text'
        />
        <label className='label' htmlFor='username'>Username</label>
        <input
          value={username}
          onChange={this.handleInputChange}
          name='username'
          className='input'
          id='username'
          type='text'
        />
        <label className='label' htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={this.handleInputChange}
          name='password'
          className='input'
          id='password'
          type='text'
        />
      <button className='btn' type='submit' disabled={this.isDisabled()}>
        Submit
      </button>
    </form>
    )
  }
}

function mapStateToProps (state) {
  const {user} = state
  return {
    user
  }
}

export default compose(
  graphql(getUserToken, { name: 'getUserToken' }),
  graphql(addUserMutation, { name: 'addUserMutation' })
)(withApollo(connect(mapStateToProps)(Register)))
