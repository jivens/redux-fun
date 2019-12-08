import React, { Component } from 'react';
import { connect } from 'react-redux'
import { flowRight as compose } from 'lodash'
import { Grid, Header, Segment, Button, Message } from 'semantic-ui-react';
import { withApollo, graphql } from 'react-apollo';
import { getUserToken, getUserFromToken } from '../../queries/queries';
import { handleLogoutUser } from '../../actions/users'

class Users extends Component {
  constructor(props) {
    super(props);
    //this.userMessage = this.userMessage.bind(this)
    this.state = {
      fields: {
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        roles: []
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      let userQuery = await this.props.client.query({
        query: getUserFromToken,
      })
      const user = userQuery.data.getUserFromToken_Q
      if (this._isMounted) {
        this.setState({
          fields: {
            first: user.first,
            last: user.last,
            email: user.email,
            username: user.username,
            password: user.password
          }
        })
      }
      console.log(user)
      console.log(this.state)
    //console.log(this.props.getUserState())
    } catch(error) {
      console.log(error)
    }
  }

  // async componentWillUnmount() {
  //   this._isMounted = false;
  //   console.log("Users is unmounting")
  // }

  handleClick(e) {
    console.log('this is:', this);
    this.props.history.push('/');
  }

  // userMessage = async () => {
  //   await this.props.checkUserRole()
  //   const user=this.props.getUserState()
  //   console.log(user)
  //   const username=user.username
  //   console.log(username)
  //   console.log(`You are currently logged in as <div style={{ color: 'blue' }}>${username}</div>  You can update your user profile, change your password, or log out.`)
  //   //return `You are currently logged in as <div style={{ color: 'blue' }}>${username}</div>  You can update your user profile, change your password, or log out.`
  //  return <div>`${username}`</div>
  // }

render() {
    return (
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 600 }} textAlign='center'>
          <Header as='h2'  textAlign='center'>
              User Actions
          </Header>
          <Message>
            There is no user message yet.
          </Message>
          <Segment stacked textAlign='center'>
            <Button size='large' color='blue' onClick={(e) => this.props.history.push('/userprofile')}>
              Update Your Profile
            </Button>
            <Button size='large' color='black' path='/changepassword' onClick={(e) => this.props.history.push('/changepassword')}>
              Change Your Password
            </Button>
            <Button size='large' color='blue'
              onClick={(e) => {
                this.props.dispatch(handleLogoutUser(this.props.client, this.props.user))
                this.props.history.push('/')
              }}>
              Logout
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
   );
  }
}

function mapStateToProps (state) {
  const {user} = state
  return {
    user
  }
}
export default compose(
  withApollo,
  graphql(getUserToken, { name: "getUserToken"}),
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withApollo(connect(mapStateToProps)(Users)))