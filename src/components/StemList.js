import React from 'react'
import { connect } from 'react-redux'

function StemList ({ stems }) {
  return (
    <ul>
      {stems.map((stem) => (
        <li className='stem' key={stem.id}>
          <div>
            <p>{stem.english} English</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function mapStatetoProps (state) {
  console.log('this is the state: ', state)
  return {
    Object.keys(stems)
      .map((id) => {
        const { stems } = stems

        return {
          stem.english,
        }
      })
  }
}

export default connect(mapStatetoProps)(StemList)