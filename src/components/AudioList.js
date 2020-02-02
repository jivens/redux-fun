import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { getAudioSetsQuery } from '../queries/queries'
import { handleAudioPageChange,
  handleAudioPageSizeChange, handleAudioSortedChange,
  handleAudioFilteredChange, handleAudioResizedChange } from '../actions/audios'
import { loadState }  from '../utils/localStorage'
import AudioTable from './AudioTable'


class AudioList extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
    const serializedState = loadState()
    this.state = {audios: serializedState.audios}
  }

  async onPageChange(page) {
    await this.props.dispatch(handleAudioPageChange(page))
    let currentState = this.state
    currentState.affixes.tableData.page = page
    this.setState(currentState)
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleAudioPageSizeChange(pageSize, page))
    let currentState = this.state
    currentState.audios.tableData.page = page
    currentState.audios.tableData.pageSize = pageSize
    this.setState(currentState)
  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleAudioSortedChange(newSorted, column, shiftKey))
    let currentState = this.state
    currentState.audios.tableData.sorted = newSorted
    this.setState(currentState)
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleAudioFilteredChange(filtered, column))
    let currentState = this.state
    currentState.audios.tableData.filtered = filtered
    this.setState(currentState)
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleAudioResizedChange(newResized, event))
    let currentState = this.state
    currentState.audios.tableData.resized = newResized
    this.setState(currentState)
  }

  render() {
    const { audios } = this.state
    return (
      <React.Fragment>
        <AudioTable audioData={audios.data} />
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const serializedState = loadState()
  const {audios} = serializedState
  return {
    audios
  }
}

export default compose(
  graphql(getAudioSetsQuery, { name: 'getAudioSetsQuery' }),
)(withApollo(connect(mapStateToProps)(AudioList)))
