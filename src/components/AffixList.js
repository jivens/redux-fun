import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import ReactTable from 'react-table'
import { getAffixesQuery, deleteAffixMutation } from '../queries/queries'
import { handleDeleteAffix } from '../actions/affixes'


class AffixList extends Component {

  constructor(props) {
    super(props)
    this.keysToList = this.keysToList.bind(this)
    this.hashToArray = this.hashToArray.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  async onDelete(id) {
    console.log("In affix deletion");
    await this.props.dispatch(handleDeleteAffix(this.props.client, id))
  };


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


  hashToArray(hash) {
    const arr = []
    Object.keys(hash).forEach(function (key) {
      const newHash = {}
      newHash['id'] = hash[key]['id']
      newHash['english'] = hash[key]['english']
      newHash['nicodemus'] = hash[key]['nicodemus']
      newHash['active'] = hash[key]['active']
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
      {
        Header: 'Active',
        accessor: 'active'
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

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(deleteAffixMutation, { name: 'deleteAffixMutation' })
)(withApollo(connect(mapStateToProps)(AffixList)))
