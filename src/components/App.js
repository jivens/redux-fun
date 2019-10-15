import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData, handleInitialAppData } from '../actions/shared'
//import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import AddPoll from './AddPoll'
import Poll from './Poll'
import Nav from './Nav'
import StemList from './StemList'
import AffixList from './AffixList'
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
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/polls/:id' component={Poll} />
                    <Route path='/add' component={AddPoll} />
                    <Route path='/stems' component={StemList} />
                    <Route path='/affixes' component={AffixList} />
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
