import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { addUserMutation, getUserToken } from '../../queries/queries'
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { handleLoginUser, handleSaveUser } from '../../actions/users'
import { useMutation } from "@apollo/react-hooks"
import { useUser } from '../App'

function Register () {

  const [user, dispatch] = useUser();
  // function handleInputChange (e) {
  //   const { value, name } = e.target

  //   this.setState(() => ({
  //     [name]: value
  //   }))
  // }

  async function onFormSubmit (login, addUser, values, setSubmitting) {
    console.log("In add user submission")
    console.log(values)
    console.log(setSubmitting)
    //const { login } = this.state
    try {
      if (login) {
        dispatch()
        //this.props.dispatch(handleLoginUser(this.props.client, this.props.history, values))
      } else {
        addUser({variables: {
          first: values.first,
          last: values.last,
          username: values.username,
          email: values.email,
          password: values.password
        }}) 
        //this.props.history.push('/users')
        //this.props.dispatch(handleSaveUser(this.props.client, values))
      }
      setSubmitting(false)
    } catch (error) {
      console.error(error)
      setSubmitting(false)
    }
  }

  //const { login } = this.state
  const [login, setLogin] = useState()
  const [addUser, { loading: addUserLoading, error: addUserError}] = useMutation(addUserMutation)
  if (login === undefined) {
    setLogin(false)
  }
  let error = false
  const addUserSchema = Yup.object().shape({
    first: Yup.string()
      .required('Required'),
    last: Yup.string()
      .required('Required'),
    username: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Password must be more than 2 characters')
      .max(30, 'Password must be less than 30 characters')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required!')
    });

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Password must be more than two characters')
      .max(30, 'Password must be less than 30 characters!')
      .required('Required'),
    });

    if (addUserLoading) return (<div>Loading</div>)
    if (addUserError) return(<div>Error</div>)

    return (
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'  textAlign='center'>
              {login ? 'Log in to your account' : 'Create an account'}
          </Header>
          {error && (
           <Message className="error">Unsuccessful: {error}</Message>
          )}
          <Segment stacked>
            <Formik
              initialValues={{ first: '', last: '', username: '', email: '', password: '', passwordConfirmation: ''}}
              validationSchema={ !login ? addUserSchema : loginSchema }
              onSubmit={(values, { setSubmitting }) => {
                onFormSubmit(login, addUser, values, setSubmitting);
              }}
            >
              {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              {!login && (
                <Input
                  fluid
                  icon="write"
                  iconPosition="left"
                  id="first"
                  placeholder="First Name"
                  type="text"
                  value={ values.first }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.first && touched.first ? 'text-input error' : 'text-input' }
                />
                )}
                {errors.first && touched.first && !login && (
                  <div className="input-feedback">{errors.first}</div>
                )}
              {!login && (
                <Input
                  fluid
                  icon="write"
                  iconPosition="left"
                  id="last"
                  placeholder="Last Name"
                  type="text"
                  value={ values.last }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.last && touched.last ? 'text-input error' : 'text-input' }
                />
              )}
                {errors.last && touched.last && !login && (
                <div className="input-feedback">{errors.last}</div>
                )}
              {!login && (
                <Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  id="username"
                  placeholder="Username"
                  type="text"
                  value={ values.username }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.username && touched.username ? 'text-input error' : 'text-input' }
                />
              )}
                {errors.username && touched.username && !login && (
                <div className="input-feedback">{errors.username}</div>
                )}
              <Input
                fluid
                icon="mail"
                iconPosition="left"
                id="email"
                placeholder="email"
                type="text"
                value={ values.email }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
              />
                {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
                )}
              <Input
                fluid
                icon='lock'
                iconPosition='left'
                id="password"
                placeholder="Password"
                type="password"
                value={ values.password }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
              />
                {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
                )}
            {!login && (
              <Input
                fluid
                icon='lock'
                iconPosition='left'
                id="passwordConfirmation"
                placeholder="Confirm your password"
                type="password"
                value={ values.passwordConfirmation }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.passwordConfirmation && touched.passwordConfirmation ? 'text-input error' : 'text-input' }
              />
              )}
                {errors.passwordConfirmation && touched.passwordConfirmation && !login &&(
                <div className="input-feedback">{errors.passwordConfirmation}</div>
                )}
              <Button color="blue" size="large" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Segment>
          <Message>
            <Button color="black" onClick={() => { setLogin(!login) } }>
                {login ? 'need to create an account?' : 'already have one?'}
            </Button>
          </Message>
      </Grid.Column>
    </Grid>
   );
}




// function mapStateToProps (state) {
//   const {user} = state
//   return {
//     user
//   }
// }

// export default compose(
//   graphql(getUserToken, { name: 'getUserToken' }),
//   graphql(addUserMutation, { name: 'addUserMutation' })
// )(withApollo(connect(mapStateToProps)(Register)))

export default Register