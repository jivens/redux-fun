import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/stems' activeClassName='active'>
            Stems
          </NavLink>
        </li>
        <li>
          <NavLink to='/affixes' activeClassName='active'>
            Affixes
          </NavLink>
        </li>
        <li>
          <NavLink to='/addaffix' activeClassName='active'>
            Add Affix
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            Add Poll
          </NavLink>
        </li>
        <li>
          <NavLink to='/stemlist' activeClassName='active'>
            Stemlist
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
