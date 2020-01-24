import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer, toast } from "react-toastify"
import { handleInitialAppData } from '../actions/shared'
import { handleUserInfo } from '../actions/users'
import LoadingBar from 'react-redux-loading'
import Register from './users/Register'
import Users from './users/Users'
import Banner from './Banner'
import NavBar from './NavBar'
import StemList from './StemList'
import RootList from './RootList'
import AffixList from './AffixList'
import BibliographyList from './BibliographyList'
import AddAffix from './AddAffix'
import AddBibliography from './AddBibliography'
import AddRoot from './AddRoot'
import EditBibliography from './AddBibliography'
import EditAffix from './EditAffix'
import EditRoot from './EditRoot'
import AddStem from './AddStem'
import EditStem from './EditStem'
import TextList from './TextList'
import 'react-table/react-table.css'
import 'semantic-ui-css/semantic.min.css'
import '../stylesheets/NavBar.css'
import '../stylesheets/Colrc.css'
import '../stylesheets/AccordionTables.css'
import "react-toastify/dist/ReactToastify.css"

// const loggedIn = () => {
//   const token = localStorage.getItem('TOKEN')
//   return token ? true : false
// }


class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialAppData(this.props.client))
    const token = localStorage.getItem('TOKEN')
    if (token) {
      this.props.dispatch(handleUserInfo(this.props.client))
    }
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
                    <Route path='/editroot/:id' component={EditRoot} />
                    <Route path='/roots' component={RootList} />
                    <Route path='/affixes' component={AffixList} />
                    <Route Path='/bibliography' component={BibliographyList} />
                    <Route path='/addaffix' component={AddAffix} />
                    <Route path='/addroot' component={AddRoot} />
                    <Route path='addbibliography' component={AddBibliography} />
                    <Route path='/editaffix/:id' component={EditAffix} />
                    <Route path='/editbibliography/:id' component={EditBibliography} />
                    <Route path='/texts' component={TextList} />
                  </div>}
                </NavBar>
                <ToastContainer autoClose={5000} />
                <Footer />
            </div>
          </Fragment>
        </Router>
    )
  }
}

function mapStateToProps ({ stems, roots, affixes, bibliography, texts, errors }) {
  return {
    loading: stems === null || roots === null || affixes === null || bibliography === null || texts === null,
    errors: errors
  }
}

class Footer extends Component {
  render() {
    return (
      <div className='centered footer'>
        <p>coeur d'alene online language resource center copyright 2009</p>
        <p>project supported by the national science foundation awards BCS-1160627 and BCS-1160394 and the national endowment for the humanities award PD-261031-18.</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
