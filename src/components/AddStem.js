import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { addStemMutation } from '../queries/queries'
import { handleAddStem } from '../actions/stems'

class AddStem extends Component {
  state = {
    category: '',
    reichard: '',
    salish: '',
    doak: '',
    nicodemus: '',
    english: '',
    note: '',
    editnote: ''
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }
  isDisabled = () => {
    const { category, reichard, salish, doak, nicodemus, english, note, editnote } = this.state

    return category === ''
      || reichard === ''
      || salish === ''
      || doak === ''
      || nicodemus === ''
      || english === ''
      || note === ''
      || editnote === ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/stems')
    this.props.dispatch(handleAddStem(this.props.client, this.state))
  }
  render() {
    const { id, category, reichard, salish, doak, nicodemus, english, note, editnote } = this.state
    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>Add Stem</h3>
        <label className='label' htmlFor='category'>Category</label>
        <input
          value={category}
          onChange={this.handleInputChange}
          name='category'
          className='input'
          id='category'
          type='text'
        />
        <label className='label' htmlFor='reichard'>Reichard</label>
        <input
          value={reichard}
          onChange={this.handleInputChange}
          name='reichard'
          className='input'
          id='reichard'
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
        <label className='label' htmlFor='doak'>Doak</label>
        <input
          value={doak}
          onChange={this.handleInputChange}
          name='doak'
          className='input'
          id='doak'
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
        <label className='label' htmlFor='note'>Note</label>
        <input
          value={note}
          onChange={this.handleInputChange}
          name='note'
          className='input'
          id='note'
          type='text'
        />
        <label className='label' htmlFor='editnote'>Edit Note</label>
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

function mapStateToProps (state) {
  const {stems} = state
  return {
    stems
  }
}
export default compose(
  graphql(addStemMutation, { name: 'addStemMutation' })
)(withApollo(connect(mapStateToProps)(AddStem)))