import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { updateStemMutation } from '../queries/queries'
import { handleEditStem } from '../actions/stems'

class EditStem extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      id: this.props.stem.id,
      category: this.props.stem.category,
      reichard: this.props.stem.reichard,
      doak: this.props.stem.doak,
      salish: this.props.stem.salish,
      nicodemus: this.props.stem.nicodemus,
      english: this.props.stem.english,
      note: this.props.stem.note,
      editnote: this.props.stem.editnote,
      prevId: this.props.stem.prevId,
      user: this.props.stem.user,
      originalStem: {
        id: this.props.stem.id,
        category: this.props.stem.category,
        reichard: this.props.stem.reichard,
        doak: this.props.stem.doak,
        salish: this.props.stem.salish,
        nicodemus: this.props.stem.nicodemus,
        english: this.props.stem.english,
        note: this.props.stem.note,
        editnote: this.props.stem.editnote,
        prevId: this.props.stem.prevId,
        user: this.props.stem.user,
      }
    }
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }
  
  isDisabled = () => {
    const { category, salish, nicodemus, reichard, doak, english, note, editnote } = this.state

    return category === ''
      || reichard === ''
      || doak === ''
      || salish === ''
      || nicodemus === ''
      || english === ''
      || note === ''
      || editnote === ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/stems')
    this.props.dispatch(handleEditStem(this.props.client, this.state))
  }
  render() {
    const { id, category, reichard, doak, salish, nicodemus, english, note, editnote } = this.state
    return (
      <form className='edit-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>Update Stem</h3>
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

function mapStateToProps ({ stems }, { match }) {
  const { id } = match.params
  let foundStem = stems.data.filter(function (stem) {
    if (stem.id == id) {
      if (stem.editnote == null) {
        stem.editnote = ''
      }
      return stem
    }
  })
  const stem = foundStem.length > 0 ? foundStem[0] : null

  console.log("The stem in editstem is: ", stem)

  return {
    stem
  }
}

export default compose(
  graphql(updateStemMutation, { name: 'updateStemMutation' })
)(withApollo(connect(mapStateToProps)(EditStem)))
