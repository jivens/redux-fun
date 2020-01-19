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
import { loadState }  from '../utils/localStorage'
import AffixListTwo from './AffixListTwo'

class AffixList extends Component {

  constructor(props) {
    super(props)
    this.affixDropdown = this.affixDropdown.bind(this)
    this.weblink = this.weblink.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
    const serializedState = loadState()
    this.state = {affixes: serializedState.affixes}
  }

  async onDelete(id) {
    await this.props.dispatch(handleDeleteAffix(this.props.client, id))
  }

  async onEdit(id) {
    this.props.history.push(`/editaffix/${id}`)
  }

  async onPageChange(page) {
    await this.props.dispatch(handleAffixPageChange(page))
    let currentState = this.state
    currentState.affixes.tableData.page = page
    this.setState(currentState)
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleAffixPageSizeChange(pageSize, page))
    let currentState = this.state
    currentState.affixes.tableData.page = page
    currentState.affixes.tableData.pageSize = pageSize
    this.setState(currentState)
  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleAffixSortedChange(newSorted, column, shiftKey))
    let currentState = this.state
    currentState.affixes.tableData.sorted = newSorted
    this.setState(currentState)
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleAffixFilteredChange(filtered, column))
    let currentState = this.state
    currentState.affixes.tableData.filtered = filtered
    this.setState(currentState)
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleAffixResizedChange(newResized, event))
    let currentState = this.state
    currentState.affixes.tableData.resized = newResized
    this.setState(currentState)
  }

  weblink(link, page) {
    return (
      link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
    );
  }

  affixDropdown(original) {
    if (original === 'd') {
      original = original.replace('d', 'directional')
    } else if (original === 'l') {
      original = original.replace('l', 'locative')
    } else if (original === 'ls') {
      original = original.replace('ls', 'lexical suffix')
    } else if (original === 'lp') {
      original = original.replace('lp', 'lexical prefix')
    }
    return(<span>{original}</span>)
  }
  render() {
    const { affixes } = this.state
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        width: 75,
        sortMethod: (a, b) => Number(a)-Number(b)
      },
      {
        Header: 'Type',
        accessor: 'type',
        width: 100,
        //setup the dropdown menu for 'type'.
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          return row[filter.id] === filter.value;
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Show All</option>
            <option value="d">Directional</option>
            <option value="l">Locative</option>
            <option value="lp">Lexical Prefixes</option>
            <option value="ls">Lexical Suffixes</option>
          </select>,
        Cell: ({row, original}) => ( this.affixDropdown(original.type) )
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
        Header: 'Link',
        accessor: 'link',
        Cell: ({row, original}) => ( this.weblink(original.link, original.page) )
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
        <AffixListTwo affixData={affixes.data} />
        {table}
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const serializedState = loadState()
  const {affixes} = serializedState
  return {
    affixes
  }
}

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(deleteAffixMutation, { name: 'deleteAffixMutation' })
)(withApollo(connect(mapStateToProps)(AffixList)))
