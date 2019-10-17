import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import ReactTable from 'react-table'
import { getStemsQuery, deleteStemMutation } from '../queries/queries'
import { handleDeleteStem} from '../actions/stems'
import { hashToArray } from '../utils/helpers'


class StemList extends Component {

  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }

  async onDelete(id) {
    console.log("In stem deletion");
    await this.props.dispatch(handleDeleteStem(this.props.client, id))
  };  

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
      data={hashToArray(stems)}
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
  const {stems} = state
  return {
    stems
  }
}

export default compose(
  graphql(getStemsQuery, { name: 'getStemsQuery' }),
  graphql(deleteStemMutation, { name: 'deleteStemMutation' })
)( withApollo(connect(mapStateToProps)(StemList)))
