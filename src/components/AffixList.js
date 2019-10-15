import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import ReactTable from 'react-table'
import { getAffixesQuery, deleteAffixMutation } from '../queries/queries'


class AffixList extends Component {

  constructor(props) {
    super(props)
    this.keysToList = this.keysToList.bind(this)
    this.hashToArray = this.hashToArray.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  async onDelete(id) {
    console.log("In affix deletion");
    try {
      let variables = {}
      await this.props.deleteAffixMutation({
        variables: {
          id: id
        },
      //after setting the flag, refetch the affixes from the db
      refetchQueries: [{ query: getAffixesQuery, variables: variables }]
      });
      //then send the user back to the affixlist display
      this.props.history.push('/affixes');
    } catch (err) {
      //console.log(err.graphQLErrors[0].message);
      console.log("Props: ", this.props)
      console.log("Err: ", err)
      this.props.history.push('/affixes');
    }
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
        Header: 'Active',
        accessor: 'active'
      },
      {
        Header: 'Edit/Delete',
        filterable: false,
        sortable: false,
        width: 100,
        //get original row id, allow user to call onDelete, or edit.  Linkto passes original affix values into editaffix form via the location string
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
