import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import ReactTable from 'react-table'
import { getAffixesQuery, deleteAffixMutation } from '../queries/queries'
import { handleDeleteAffix, handleAffixPageChange, handleAffixPageSizeChange } from '../actions/affixes'
import { hashToArray } from '../utils/helpers'


class AffixList extends Component {

  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
  }

  async onDelete(id) {
    console.log("In affix deletion");
    await this.props.dispatch(handleDeleteAffix(this.props.client, id))
  }

  async onPageChange(page) {
    await this.props.dispatch(handleAffixPageChange(page))
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleAffixPageSizeChange(pageSize, page))
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
      data={affixes.data}
      page={affixes.tableData.page}
      pageSize={affixes.tableData.pageSize}
      onPageChange={page => this.onPageChange(page)}
      onPageSizeChange={(pageSize,page) => this.onPageSizeChange(pageSize,page)}
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
