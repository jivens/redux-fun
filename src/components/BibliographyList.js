import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getBibliographyQuery, deleteBibliographyMutation } from '../queries/queries'
import { handleDeleteBibliography, handleBibliographyPageChange,
  handleBibliographyPageSizeChange, handleBibliographySortedChange,
  handleBibliographyFilteredChange, handleBibliographyResizedChange } from '../actions/Bibliography'
import { loadState }  from '../utils/localStorage'
import '../stylesheets/tables.css'
import { render } from 'react-dom'

class BibliographyList extends Component {
  
  constructor(props) {
    super(props)
    this.bibliographyDropdown = this.bibliographyDropdown.bind(this)
    this.weblink = this.weblink.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
    const serializedState = loadState()
    this.state = {bibliography: serializedState.bibliography}
  }

  async onDelete(id) {
    await this.props.dispatch(handleDeleteBibliography(this.props.client, id))
  }

  async onEdit(id) {
    this.props.history.push(`/editBibliography/${id}`)
  }

  async onPageChange(page) {
    await this.props.dispatch(handleBibliographyPageChange(page))
    let currentState = this.state
    currentState.Bibliography.tableData.page = page
    this.setState(currentState)
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleBibliographyPageSizeChange(pageSize, page))
    let currentState = this.state
    currentState.Bibliography.tableData.page = page
    currentState.Bibliography.tableData.pageSize = pageSize
    this.setState(currentState)
  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleBibliographySortedChange(newSorted, column, shiftKey))
    let currentState = this.state
    currentState.Bibliography.tableData.sorted = newSorted
    this.setState(currentState)
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleBibliographyFilteredChange(filtered, column))
    let currentState = this.state
    currentState.Bibliography.tableData.filtered = filtered
    this.setState(currentState)
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleBibliographyResizedChange(newResized, event))
    let currentState = this.state
    currentState.Bibliography.tableData.resized = newResized
    this.setState(currentState)
  }

  weblink(link, title) {
    return (
      link === '' ? title : <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
    );
  }

  render() {
    const { bibliography } = this.state
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        width: 75,
        sortMethod: (a, b) => Number(a)-Number(b)
      },
      {
        Header: 'Author',
        accessor: 'author',
        // style: { 'whiteSpace': 'unset'},
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["author"], threshold: matchSorter.rankings.CONTAINS }),
            filterAll: true,
      },
      {
        Header: 'Year',
        accessor: 'year',
        maxWidth: 100,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["year"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Title',
        accessor: 'title',
        // style: { 'whiteSpace': 'unset'},
        Cell: ({row, original}) => ( this.weblink(original.link, original.title) ),
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
              filterAll: true,
      },
      {
        Header: 'Reference',
        accessor: 'reference',
        style: { 'whiteSpace': 'unset' }, //allows text to wrap in a cell
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["reference"], threshold: matchSorter.rankings.CONTAINS }),
              filterAll: true,
      },
      {
        Header: 'Username',
        accessor: 'user.username',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["user.username"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        width: 100,
      },
      {
        Header: 'Active',
        accessor: 'active',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["active"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        width: 50,
      },
      {
        Header: 'Edit/Delete',
        filterable: false,
        sortable: false,
        width: 100,
        //get original row id, allow user to call onDelete, or edit.  Linkto passes original bibliography values into editbib form via the location string
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
    ];

    const table =
    <ReactTable
      data={bibliography.data}
      page={bibliography.tableData.page}
      pageSize={bibliography.tableData.pageSize}
      filtered={bibliography.tableData.filtered}
      sorted={bibliography.tableData.sorted}
      resized={bibliography.tableData.resized}
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
        <BibliographyList bibliographyData={bibliography.data} />
        {table}
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const serializedState = loadState()
  const {bibliography} = serializedState
  return {
    bibliography
  }
}

export default compose(
  graphql(getBibliographyQuery, { name: 'getBibliographyQuery' }),
  graphql(deleteBibliographyMutation, { name: 'deleteBibliographyMutation' })
)(withApollo(connect(mapStateToProps)(BibliographyList)))
