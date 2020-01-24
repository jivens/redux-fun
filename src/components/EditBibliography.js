import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { updateBibliographyMutation } from '../queries/queries'
import { handleEditBibliography } from '../actions/bibliography'
import { errorCallback } from '../utils/helpers'

class EditBibliography extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      id: this.props.bibliography.id,
      author: this.props.bibliography.author,
      year: this.props.bibliography.year,
      title: this.props.bibliography.title,
      reference: this.props.bibliography.reference,
      link: this.props.bibliography.link,
      linktext: this.props.bibliography.linktext,
      prevId: this.props.bibliography.prevId,
      user: this.props.bibliography.user,
      originalBibliography: {
        id: this.props.bibliography.id,
        author: this.props.bibliography.author,
        year: this.props.bibliography.year,
        title: this.props.bibliography.title,
        reference: this.props.bibliography.reference,
        link: this.props.bibliography.link,
        linktext: this.props.bibliography.linktext,
        prevId: this.props.bibliography.prevId,
        user: this.props.bibliography.user,
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
    this.props.dispatch(handleEditBibliography(this.props.client, this.state, errorCallback))
  }
  render() {
    const { author, year, title, reference, link, linktext } = this.state
    return (
      <form className='edit-form' onSubmit={this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>Update Bibliography</h3>
        <label className='label' htmlFor='a'>Author</label>
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

function mapStateToProps ({ bibliography }, { match }) {
  const { id } = match.params
  console.log("id: ", id)
  console.log("bibliography data: ", bibliography.data)
  let bibliography = bibliography.data.find(element => element.id === id)
  if (bibliography && bibliography.link === null) {
    bibliography.link = ''
  }

  console.log("The bibliography in editBibliography is: ", bibliography)

  return {
    bibliography
  }
}

export default compose(
  graphql(updateBibliographyMutation, { name: 'updateBibliographyMutation' })
)(withApollo(connect(mapStateToProps)(EditBibliography)))
