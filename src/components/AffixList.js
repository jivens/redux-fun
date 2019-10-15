import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

class AffixList extends Component {

  constructor(props) {
    super(props)
    // this.keysToList = this.keysToList.bind(this)
    this.hashToArray = this.hashToArray.bind(this)
  }

  // keysToList(list) {
  //   const liElements = []
  //   Object.keys(list).forEach(function (key) {
  //     liElements.push(
  //       <li>
  //         {list[key]['english']}
  //       </li>
  //     )
  //   })
  //   return <ul>{liElements}</ul>
  // }

  hashToArray(hash) {
    const arr = []
    Object.keys(hash).forEach(function (key) {
      const newHash = {}
      newHash['english'] = hash[key]['english']
      newHash['nicodemus'] = hash[key]['nicodemus']
      newHash['active'] = hash[key]['active']
      newHash['id'] = hash[key]['id']
      newHash['user'] = hash[key]['user']
      arr.push(
        newHash
      )
    })
    return arr
  }

  render() {
    const { affixes } = this.props
    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus'
      },
      {
        Header: 'English',
        accessor: 'english'
      },
      {
        Header: 'Username',
        accessor: 'user.username'
      },
    ]

  const table =
    <ReactTable
      data={this.hashToArray(affixes)}
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

export default connect(mapStateToProps)(AffixList)
