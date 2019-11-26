import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData, handleInitialAppData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
//import UserList from './UserList'
import Register from './Register'
import { Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';
import NavBar from './NavBar';
import Nav from './Nav';
import StemList from './StemList'
import RootList from './RootList'
import AffixList from './AffixList'
import AddAffix from './AddAffix'
import AddRoot from './AddRoot'
import EditAffix from './EditAffix'
import EditRoot from './EditRoot'
import AddStem from './AddStem'
import EditStem from './EditStem'
import { ApolloConsumer } from "react-apollo"

class App extends Component {
  componentDidMount () {
    //this.props.dispatch(handleInitialData())
    this.props.dispatch(handleInitialAppData(this.props.client))
    this.rightMenuItems = this.rightMenuItems.bind(this)
  }

  rightMenuItems = () => {
    const rightItems = [
      { to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
      { to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'},
      { to: "/users", icon: 'user', content:"User Profile", key: 'ruser'}
    ]
    // if (loggedIn()){
    //   rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    // }
    // else {
    //   rightItems.push({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
    // }
    return rightItems
  }

  render() {
    return (
        <Router>
          <Fragment>
            <div className='container'>
              <NavBar rightItems={this.rightMenuItems()}>
              <MainMenu />
              {this.props.loading === true
                ? null
                : <div>
                    <Route path='/register' component={Register} />
                    <Route path='/stems' component={StemList} />
                    <Route path='/addstem' component={AddStem} />
                    <Route path='/editstem/:id' component={EditStem} />
                    <Route path='/editroot/:id' component={EditRoot} />
                    <Route path='/roots' component={RootList} />
                    <Route path='/affixes' component={AffixList} />
                    <Route path='/addaffix' component={AddAffix} />
                    <Route path='/addroot' component={AddRoot} />
                    <Route path='/editaffix/:id' component={EditAffix} />
                  </div>}
                </NavBar>
                <LoadingBar />
                <Footer />
            </div>
          </Fragment>
        </Router>
    )
  }
}

function mapStateToProps ({ stems, roots, affixes }) {
  return {
    loading: stems === null || roots === null || affixes === null
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
