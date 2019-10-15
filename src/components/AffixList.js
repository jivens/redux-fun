import React, { Component } from 'react'
import { connect } from 'react-redux'

class AffixList extends Component {

  constructor(props) {
    super(props)
    this.keysToList = this.keysToList.bind(this)
  }

  keysToList(list) {
    const liElements = []
    Object.keys(list).forEach(function (key) {
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
    const { affixes } = this.props

    return (
      <div className='poll-container'>
        {this.keysToList(affixes)}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {affixes} = state
  return {
    affixes
  }
}

export default connect(mapStateToProps)(AffixList)
