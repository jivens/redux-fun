import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { addBibliographyMutation } from '../queries/queries'
import { handleAddBibliography } from '../actions/bibliography'

class AddBibliography extends Component {
  state = {
    author: '',
    year: '',
    title: '',
    reference: '',
    link: '',
    linktext: ''
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }
  isDisabled = () => {
    const { author, year, title, reference, link, linktext } = this.state

    return author === ''
      || year === ''
      || title === ''
      || reference === ''
      || link === ''
      || linktext === ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/bibliography')
    this.props.dispatch(handleAddBibliography(this.props.client, this.state))
  }
  render() {
    const { author, year, title, reference, link, linktext } = this.state

    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>New Bibliography</h3>
        <label className='label' htmlFor='type'>Author</label>
        <input
          value={author}
          onChange={this.handleInputChange}
          name='author'
          className='input'
          id='author'
          type='text'
        />
        <label className='label' htmlFor='year'>Year</label>
        <input
          value={year}
          onChange={this.handleInputChange}
          name='year'
          className='input'
          id='year'
          type='text'
        />
        <label className='label' htmlFor='title'>Title</label>
        <input
          value={title}
          onChange={this.handleInputChange}
          name='title'
          className='input'
          id='title'
          type='text'
        />

        <label className='label' htmlFor='reference'>Reference</label>
        <input
          value={reference}
          onChange={this.handleInputChange}
          name='reference'
          className='input'
          id='reference'
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
        <label className='label' htmlFor='linktext'>Link Text</label>
        <input
          value={linktext}
          onChange={this.handleInputChange}
          name='linktext'
          className='input'
          id='linktext'
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
  const {bibliography} = state
  return {
    bibliography
  }
}
export default compose(
  graphql(addBibliographyMutation, { name: 'addBibliographyMutation' })
)(withApollo(connect(mapStateToProps)(AddBibliography)))
