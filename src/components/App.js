import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData, handleInitialAppData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { isLoggedIn } from '../utils/helpers'
import { Grid } from 'semantic-ui-react'
//import UserList from './users/UserList'
import Register from './users/Register'
import Users from './users/Users'
import Banner from './Banner'
import NavBar from './NavBar'
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
  }


  render() {
    return (

        <Router>
          <Fragment>
            <div className='container'>
              <NavBar>
              <Banner />
              <LoadingBar />
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
      <div className='centered'>
        <p>coeur d'alene online language resource center copyright 2009</p>
        <p>project supported by the national science foundation awards BCS-1160627 and BCS-1160394 and the national endowment for the humanities award PD-261031-18.</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
