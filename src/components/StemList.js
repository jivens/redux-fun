import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getStemsQuery, deleteStemMutation } from '../queries/queries'
import { handleDeleteStem, handleStemPageChange,
  handleStemPageSizeChange, handleStemSortedChange,
  handleStemFilteredChange, handleStemResizedChange } from '../actions/stems'
import { hashToArray } from '../utils/helpers'


class StemList extends Component {

  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
  }

  async onDelete(id) {
    console.log("In stem deletion");
    await this.props.dispatch(handleDeleteStem(this.props.client, id))
  };

  async onEdit(id) {
    this.props.history.push(`/editstem/${id}`)
  }
  async onPageChange(page) {
    await this.props.dispatch(handleStemPageChange(page))
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleStemPageSizeChange(pageSize, page))
  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleStemSortedChange(newSorted, column, shiftKey))
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleStemFilteredChange(filtered, column))
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleStemResizedChange(newResized, event))
  }


  render() {
    const { stems } = this.props
    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Category',
        accessor: 'category'
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
        Header: 'Note',
        accessor: 'note',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["note"], threshold: matchSorter.rankings.CONTAINS }),
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
      data={stems.data}
      columns={columns}
      page={stems.tableData.page}
      pageSize={stems.tableData.pageSize}
      filtered={stems.tableData.filtered}
      sorted={stems.tableData.sorted}
      resized={stems.tableData.resized}
      filterable
      onPageChange={page => this.onPageChange(page)}
      onPageSizeChange={(pageSize,page) => this.onPageSizeChange(pageSize,page)}
      onSortedChange={(newSorted,column,shiftKey) => this.onSortedChange(newSorted,column,shiftKey)}
      onResizedChange={(newResized, event) => this.onResizedChange(newResized, event)}
      onFilteredChange={(filtered, column) => this.onFilteredChange(filtered,column)}
    />

    return (
      <React.Fragment>
        {table}
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const {stems} = state
  return {
    stems
  }
}

export default compose(
  graphql(getStemsQuery, { name: 'getStemsQuery' }),
  graphql(deleteStemMutation, { name: 'deleteStemMutation' })
)( withApollo(connect(mapStateToProps)(StemList)))
