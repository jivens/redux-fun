import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData, handleInitialAppData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { isLoggedIn } from '../utils/helpers'
import { Grid } from 'semantic-ui-react'
//import UserList from './UserList'
import Register from './Register'
import Users from './Users'
import MainMenu from './MainMenu'
import NavBar from './NavBar'
import Nav from './Nav'
import StemList from './StemList'
import AffixList from './AffixList'
import AddAffix from './AddAffix'
import EditAffix from './EditAffix'
import AddStem from './AddStem'
import EditStem from './EditStem'
import { ApolloConsumer } from "react-apollo"

const loggedIn = () => {
  const token = localStorage.getItem('TOKEN')
  return token ? true : false
}

class App extends Component {
  componentDidMount () {
    //this.props.dispatch(handleInitialData())
    this.props.dispatch(handleInitialAppData(this.props.client))
    this.rightMenuItems = this.rightMenuItems.bind(this)
  }

  rightMenuItems = () => {
    const rightItems = [
      { to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
    ]
    if (loggedIn()){
      rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    }
    else {
      rightItems.push({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
    }
    return rightItems
  }

  render() {
    return (

        <Router>
          <Fragment>
            <LoadingBar />
            <div className='container'>
              <NavBar rightItems={this.rightMenuItems()}>
              <MainMenu />
              {this.props.loading === true
                ? null
                : <div>
                    <Route path='/register' component={Register} />
                    <Route path='/users' component={Users} />
                    <Route path='/stems' component={StemList} />
                    <Route path='/addstem' component={AddStem} />
                    <Route path='/editstem/:id' component={EditStem} />
                    <Route path='/affixes' component={AffixList} />
                    <Route path='/addaffix' component={AddAffix} />
                    <Route path='/editaffix/:id' component={EditAffix} />
                  </div>}
                </NavBar>
                <Footer />
            </div>
          </Fragment>
        </Router>

    )
  }
}

function mapStateToProps ({ stems }) {
  return {
    loading: stems === null
  }
}

class Footer extends Component {
  render() {
    return (
      <div className='ui bottom centered'>
        <p></p>
        <p>coeur d'alene online language resource center copyright 2009</p>
        <p>project supported by the national science foundation awards BCS-1160627 and BCS-1160394 and the national endowment for the humanities award PD-261031-18.</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
