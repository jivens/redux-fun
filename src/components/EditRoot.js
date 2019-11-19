import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { updateRootMutation } from '../queries/queries'
import { handleEditRoot } from '../actions/roots'

class EditRoot extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      root: this.props.root.root,
      number: this.props.root.number,
      sense: this.props.root.sense,
      salish: this.props.root.salish,
      nicodemus: this.props.root.nicodemus,
      symbol: this.props.root.symbol,
      english: this.props.root.english,
      grammar: this.props.root.grammar,
      crossref: this.props.root.crossref,
      variant: this.props.root.variant,
      cognate: this.props.root.cognate,
      editnote: this.props.root.editnote,
      prevId: this.props.root.prevId,
      user: this.props.root.user,
      originalRoot: {
        root: this.props.root.root,
        number: this.props.root.number,
        sense: this.props.root.sense,
        salish: this.props.root.salish,
        nicodemus: this.props.root.nicodemus,
        symbol: this.props.root.symbol,
        english: this.props.root.english,
        grammar: this.props.root.grammar,
        crossref: this.props.root.crossref,
        variant: this.props.root.variant,
        cognate: this.props.root.cognate,
        editnote: this.props.root.editnote,
        prevId: this.props.root.prevId,
        user: this.props.root.user,
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

    const { root, number, sense, salish, nicodemus, symbol, english, grammar, crossref, variant, cognate, editnote } = this.state

    return root === ''
      || number === ''
      || sense === ''
      || salish === ''
      || nicodemus === ''
      || symbol === ''
      || english === ''
      || grammar === ''
      || crossref === ''
      || variant === ''
      || cognate === ''
      || editnote === ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/roots')
    this.props.dispatch(handleEditRoot(this.props.client, this.state))
  }
  render() {
    const { root, number, sense, salish, nicodemus, symbol, english, grammar, crossref, variant, cognate, editnote } = this.state
    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>Add Root</h3>
        <label className='label' htmlFor='root'>Root</label>
        <input
          value={root}
          onChange={this.handleInputChange}
          name='root'
          className='input'
          id='root'
          type='text'
        />
        <label className='label' htmlFor='number'>Number</label>
        <input
          value={number}
          onChange={this.handleInputChange}
          name='number'
          className='input'
          id='number'
          type='text'
        />
        <label className='label' htmlFor='sense'>Sense</label>
        <input
          value={sense}
          onChange={this.handleInputChange}
          name='sense'
          className='input'
          id='sense'
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
        <label className='label' htmlFor='symbol'>Symbol</label>
        <input
          value={symbol}
          onChange={this.handleInputChange}
          name='symbol'
          className='input'
          id='symbol'
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
        <label className='label' htmlFor='grammar'>Grammar</label>
        <input
          value={grammar}
          onChange={this.handleInputChange}
          name='grammar'
          className='input'
          id='grammar'
          type='text'
        />
        <label className='label' htmlFor='crossref'>Crossref</label>
        <input
          value={crossref}
          onChange={this.handleInputChange}
          name='crossref'
          className='input'
          id='crossref'
          type='text'
        />
        <label className='label' htmlFor='variant'>Variant</label>
        <input
          value={variant}
          onChange={this.handleInputChange}
          name='variant'
          className='input'
          id='variant'
          type='text'
        />
        <label className='label' htmlFor='cognate'>Cognate</label>
        <input
          value={cognate}
          onChange={this.handleInputChange}
          name='cognate'
          className='input'
          id='cognate'
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

function mapStateToProps ({ roots }, { match }) {
  const { id } = match.params
  let foundRoot = roots.data.filter(function (root) {
    if (root.id == id) {
      if (root.editnote == null) {
        root.editnote = ''
      }
      return root
    }
  })
  const root = foundRoot.length > 0 ? foundRoot[0] : null

  console.log("The root in editroot is: ", root)

  return {
    root
  }
}

export default compose(
  graphql(updateRootMutation, { name: 'updateRootMutation' })
)(withApollo(connect(mapStateToProps)(EditRoot)))
