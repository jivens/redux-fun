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
          <NavLink to='/register' activeClassName='active'>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to='/stems' activeClassName='active'>
            Stems
          </NavLink>
        </li>
        <li>
          <NavLink to='/addstem' activeClassName='active'>
            Add Stem
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
      </ul>
    </nav>
  )
}
