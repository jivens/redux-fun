import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData, handleInitialAppData } from '../actions/shared'
//import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
//import UserList from './UserList'
import Register from './Register'
import AddPoll from './AddPoll'
import Poll from './Poll'
import Nav from './Nav'
import StemList from './StemList'
import AffixList from './AffixList'
import AddAffix from './AddAffix'
import EditAffix from './EditAffix'
import AddStem from './AddStem'
import EditStem from './EditStem'
import { ApolloConsumer } from "react-apollo"

class App extends Component {
  componentDidMount () {
    //this.props.dispatch(handleInitialData())
    this.props.dispatch(handleInitialAppData(this.props.client))
  }

  render() {
    return (

        <Router>
          <Fragment>
            <LoadingBar />
            <div className='container'>
              <Nav />
              {this.props.loading === true
                ? null
                : <div>
                    <Route path='/register' component={Register} />
                    <Route path='/polls/:id' component={Poll} />
                    <Route path='/add' component={AddPoll} />
                    <Route path='/stems' component={StemList} />
                    <Route path='/addstem' component={AddStem} />
                    <Route path='/editstem/:id' component={EditStem} />
                    <Route path='/affixes' component={AffixList} />
                    <Route path='/addaffix' component={AddAffix} />
                    <Route path='/editaffix/:id' component={EditAffix} />
                  </div>}
            </div>
          </Fragment>
        </Router>

    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
