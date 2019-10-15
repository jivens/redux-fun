import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import ReactTable from 'react-table'

class StemList extends Component {

  constructor(props) {
    super(props)
    this.keysToList = this.keysToList.bind(this)
  }

  keysToList(list) {
    const liElements = []
    Object.keys(list).forEach(function (key) {
      //console.log(list[key]['english'])
      const {id, salish, nicodemus, english, active} = list[key]
      liElements.push(
        <li>
          <span>{[id, salish, nicodemus, english, active].join(' | ')}</span>
          <button onClick={() => alert('Remove')}>X</button>
        </li>
      )
    })
    return <ul>{liElements}</ul>
  }

  render() {
    //console.log('props to StemList', this.props)
    const { stems } = this.props
    //console.log(typeof(stems))
    //console.log('stems', stems)
    //console.log('first element of stems: ', stems[0])
    //console.log("keys of stems", Object.keys(stems))

    return (
      <div className='poll-container'>
        {this.keysToList(stems)}
      </div>
    )
  }
}

function mapStateToProps (state) {
  //console.log('state: ', state)
  const {stems} = state
  //console.log(stems)
  return {
    stems
  }
}

export default withApollo(connect(mapStateToProps)(StemList))
