import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='Nav'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/search'>Search</NavLink>
    </nav>
  )
}

export default Nav;