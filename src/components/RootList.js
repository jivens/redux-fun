import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getRootsQuery, deleteRootMutation } from '../queries/queries'
import { handleDeleteRoot, handleRootPageChange,
  handleRootPageSizeChange, handleRootSortedChange,
  handleRootFilteredChange, handleRootResizedChange } from '../actions/roots'
import { loadState }  from '../utils/localStorage'

class RootList extends Component {

  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
    const serializedState = loadState()
    this.state = {roots: serializedState.roots}
  }

  async onDelete(id) {
    await this.props.dispatch(handleDeleteRoot(this.props.client, id))
  }

  async onEdit(id) {
    this.props.history.push(`/editroot/${id}`)
  }

  async onPageChange(page) {
    await this.props.dispatch(handleRootPageChange(page))
    let currentState = this.state
    currentState.roots.tableData.page = page
    this.setState(currentState)
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleRootPageSizeChange(pageSize, page))
    let currentState = this.state
    currentState.roots.tableData.page = page
    currentState.roots.tableData.pageSize = pageSize
    this.setState(currentState)
  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleRootSortedChange(newSorted, column, shiftKey))
    let currentState = this.state
    currentState.roots.tableData.sorted = newSorted
    this.setState(currentState)
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleRootFilteredChange(filtered, column))
    let currentState = this.state
    currentState.roots.tableData.filtered = filtered
    this.setState(currentState)
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleRootResizedChange(newResized, event))
    let currentState = this.state
    currentState.roots.tableData.resized = newResized
    this.setState(currentState)
  }

  render() {
    const { roots } = this.state
    console.log('Roots=', roots)
    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Root',
        accessor: 'root',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["root"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Number',
        accessor: 'number'
      },
      {
        Header: 'Sense',
        accessor: 'sense',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["sense"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Salish',
        accessor: 'salish',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["symbol"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'English',
        accessor: 'english',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Grammar',
        accessor: 'grammar',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["grammar"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Crossref',
        accessor: 'crossref',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["crossref"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Variant',
        accessor: 'variant',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["variant"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Cognate',
        accessor: 'cognate',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["cognate"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Username',
        accessor: 'user.username',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["user.username"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Active',
        accessor: 'active',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["active"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Edit/Delete',
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({row, original}) => (
          <div>
            <button onClick={() => this.onEdit(original.id)}>
                E
            </button>
            <button onClick={() => this.onDelete(original.id)}>
                X
            </button>
          </div>
        )
      }
    ]

  const table =
    <ReactTable
      data={roots.data}
      page={roots.tableData.page}
      pageSize={roots.tableData.pageSize}
      filtered={roots.tableData.filtered}
      sorted={roots.tableData.sorted}
      resized={roots.tableData.resized}
      filterable
      onPageChange={page => this.onPageChange(page)}
      onPageSizeChange={(pageSize,page) => this.onPageSizeChange(pageSize,page)}
      onSortedChange={(newSorted,column,shiftKey) => this.onSortedChange(newSorted,column,shiftKey)}
      onResizedChange={(newResized, event) => this.onResizedChange(newResized, event)}
      onFilteredChange={(filtered, column) => this.onFilteredChange(filtered,column)}
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
  const serializedState = loadState()
  const {roots} = serializedState
  return {
    roots
  }
}

export default compose(
	graphql(getRootsQuery, { name: 'getRootsQuery' }),
	graphql(deleteRootMutation, { name: 'deleteRootMutation' })
)(withApollo(connect(mapStateToProps)(RootList)))
