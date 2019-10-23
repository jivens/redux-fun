import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getAffixesQuery, deleteAffixMutation } from '../queries/queries'
import { handleDeleteAffix, handleAffixPageChange,
  handleAffixPageSizeChange, handleAffixSortedChange,
  handleAffixFilteredChange, handleAffixResizedChange } from '../actions/affixes'
import { hashToArray } from '../utils/helpers'

class AffixList extends Component {

  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
  }

  async onDelete(id) {
    console.log("In affix deletion");
    await this.props.dispatch(handleDeleteAffix(this.props.client, id))
  }

  async onPageChange(page) {
    await this.props.dispatch(handleAffixPageChange(page))
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleAffixPageSizeChange(pageSize, page))
  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleAffixSortedChange(newSorted, column, shiftKey))
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleAffixFilteredChange(filtered, column))
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleAffixResizedChange(newResized, event))
  }

  render() {
    const { affixes } = this.props
    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
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
            <button onClick={() => this.onDelete(original.id)}>
                X
            </button>
          </div>
        )
      }
    ]

  const table =
    <ReactTable
      data={affixes.data}
      page={affixes.tableData.page}
      pageSize={affixes.tableData.pageSize}
      filtered={affixes.tableData.filtered}
      sorted={affixes.tableData.sorted}
      resized={affixes.tableData.resized}
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
  const {affixes} = state
  return {
    affixes
  }
}

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(deleteAffixMutation, { name: 'deleteAffixMutation' })
)(withApollo(connect(mapStateToProps)(AffixList)))
