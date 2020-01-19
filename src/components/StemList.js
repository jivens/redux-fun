import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getStemsQuery, deleteStemMutation } from '../queries/queries'
import { handleDeleteStem, handleStemPageChange,
  handleStemPageSizeChange, handleStemSortedChange,
  handleStemFilteredChange, handleStemResizedChange } from '../actions/stems'
import { loadState }  from '../utils/localStorage'
import DecoratedTextSpan from '../utils/DecoratedTextSpan';

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
    this.stemDropdown = this.stemDropdown.bind(this);
    const serializedState = loadState()
    this.state = {stems: serializedState.stems}
  }

  // componentWillMount() {
  //   if (this.props.stems) {
  //     this.setState({stems: this.props.stems})
  //   } else {
  //     const serializedState = loadState()
  //     this.setState({stems: serializedState.stems})
  //   }
  // }

  async onDelete(id) {
    console.log("In stem deletion");
    await this.props.dispatch(handleDeleteStem(this.props.client, id))
  }

  async onEdit(id) {
    this.props.history.push(`/editstem/${id}`)
  }

  async onPageChange(page) {
    await this.props.dispatch(handleStemPageChange(page))
    let currentState = this.state
    currentState.stems.tableData.page = page
    this.setState(currentState)
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleStemPageSizeChange(pageSize, page))
    let currentState = this.state
    currentState.stems.tableData.page = page
    currentState.stems.tableData.pageSize = pageSize
    this.setState(currentState)

  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleStemSortedChange(newSorted, column, shiftKey))
    let currentState = this.state
    currentState.stems.tableData.sorted = newSorted
    this.setState(currentState)
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleStemFilteredChange(filtered, column))
    let currentState = this.state
    currentState.stems.tableData.filtered = filtered
    this.setState(currentState)
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleStemResizedChange(newResized, event))
    let currentState = this.state
    currentState.stems.tableData.resized = newResized
    this.setState(currentState)
  }

  stemDropdown(original) {
    if (original === 'v') {
      original = original.replace('v', 'verb')
    } else if (original === 'n') {
      original = original.replace('n', 'noun')
    } else if (original === 'aci') {
      original = original.replace('aci', 'other')
    }
    return(<span>{original}</span>)
  }
  render() {
    const { stems } = this.state
    console.log('this is the loadState stems ', stems)

    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        sortMethod: (a, b) => Number(a)-Number(b)
      },
      {
        Header: 'Category',
        accessor: 'category',
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          return row[filter.id] === filter.value;
        },
        Filter: ({filter, onChange}) =>
          <select onChange = { event => onChange(event.target.value)}
            style = {{ width: "100%"}}
            value = {filter ? filter.value : "all"} >
          <option value = "all" > Show All </option>
          <option value = "v" > Verbs </option>
          <option value = "n" > Nouns </option>
          <option value = "aci" > Other </option>
          </select>,
        Cell: ({row, original}) => ( this.stemDropdown(original.category) )
      },
      {
        Header: 'Reichard',
        accessor: 'reichard',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["reichard"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        Cell: row => ( <DecoratedTextSpan str={row.value} />),
      },
      {
        Header: 'Doak',
        accessor: 'doak',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["doak"], threshold: matchSorter.rankings.CONTAINS }),
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
        Cell: row => ( <DecoratedTextSpan str={row.value} />),
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
  const serializedState = loadState()
  console.log('here is my stems.tableData state ', serializedState.stems.tableData)
  //const {stems} = serializedState
  const {stems} = state
  return {
    stems
  }
}

export default compose(
  graphql(getStemsQuery, { name: 'getStemsQuery' }),
  graphql(deleteStemMutation, { name: 'deleteStemMutation' })
)( withApollo(connect(mapStateToProps)(StemList)))
