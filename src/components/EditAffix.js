import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { updateAffixMutation } from '../queries/queries'
import { handleEditAffix } from '../actions/affixes'

class EditAffix extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      id: this.props.affix.id,
      type: this.props.affix.type,
      salish: this.props.affix.salish,
      nicodemus: this.props.affix.nicodemus,
      english: this.props.affix.english,
      link: this.props.affix.link,
      page: this.props.affix.page,
      editnote: this.props.affix.editnote,
      prevId: this.props.affix.prevId,
      user: this.props.affix.user
    }
  }

  // componentWillReceiveProps(nextProps){
  //   if (this.props.id != nextProps.id){
  //     this.setState
  //   }
  // }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }
  isDisabled = () => {
    const { type, salish, nicodemus, english, link, page, editnote } = this.state

    return type === ''
      || salish === ''
      || nicodemus === ''
      || english === ''
      || link === ''
      || page === ''
      || editnote === ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/affixes')
    this.props.dispatch(handleEditAffix(this.props.client, this.state))
  }
  render() {
    const { type, salish, nicodemus, english, link, page, editnote } = this.state

    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>New Affix</h3>
        <label className='label' htmlFor='a'>Type</label>
        <input
          value={type}
          onChange={this.handleInputChange}
          name='type'
          className='input'
          id='type'
          type='text'
        />
        <label className='label' htmlFor='salish'>Salish</label>
        <input
          value={salish}
          onChange={this.handleInputChange}
          name='salish'
          className='input'
          id='salish'
          type='text'
        />
        <label className='label' htmlFor='nicodemus'>Nicodemus</label>
        <input
          value={nicodemus}
          onChange={this.handleInputChange}
          name='nicodemus'
          className='input'
          id='nicodemus'
          type='text'
        />

        <label className='label' htmlFor='english'>English</label>
        <input
          value={english}
          onChange={this.handleInputChange}
          name='english'
          className='input'
          id='english'
          type='text'
        />
        <label className='label' htmlFor='link'>Link</label>
        <input
          value={link}
          onChange={this.handleInputChange}
          name='link'
          className='input'
          id='link'
          type='text'
        />
        <label className='label' htmlFor='page'>Page</label>
        <input
          value={page}
          onChange={this.handleInputChange}
          name='page'
          className='input'
          id='page'
          type='text'
        />
        <label className='label' htmlFor='editnote'>Note</label>
        <input
          value={editnote}
          onChange={this.handleInputChange}
          name='editnote'
          className='input'
          id='editnote'
          type='text'
        />
        <button className='btn' type='submit' disabled={this.isDisabled()}>
          Submit
        </button>
      </form>
    )
  }
}

function mapStateToProps ({ affixes }, { match }) {
  const { id } = match.params
  console.log("id: ", id)
  console.log("affixes data: ", affixes.data)
  let foundAffix = affixes.data.filter(function (affix) {
    if (affix.id == id) {
      if (affix.editnote == null) {
        affix.editnote = ''
      }
      return affix
    }
  })
  const affix = foundAffix.length > 0 ? foundAffix[0] : null

  console.log("The affix in editaffix is: ", affix)

  return {
    affix
  }
}

export default compose(
  graphql(updateAffixMutation, { name: 'updateAffixMutation' })
)(withApollo(connect(mapStateToProps)(EditAffix)))
