import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getUsersQuery } from '.../queries/queries'
import { hashToArray } from '.../utils/helpers'

class UserList extends Component {

  constructor(props) {
    super(props)
  }

render() {
    const { users } = this.props
    const columns = [
      {
        Header: 'First',
        accessor: 'first'
      },
      {
        Header: 'Last',
        accessor: 'last'
      },
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({row, original}) => (original.roles.join(', ')),
      },
    ]

  const table =
    <ReactTable
      data={users.data}
      columns={columns}
    />

    return (
      <React.Fragment>
        {table}
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const {users} = state
  return {
    users
  }
}

export default compose(
  graphql(getUsersQuery, { name: 'getUsersQuery' }),
)(withApollo(connect(mapStateToProps)(UserList)))
