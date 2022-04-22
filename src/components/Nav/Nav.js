import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../UserContext';
import Button from '../Button/Button';

const Nav = () => {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <nav className='Nav'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/front-page'>Front Page</NavLink>
      <NavLink to='/search'>Search</NavLink> 
      {user ?
      <>
        <NavLink to={`/user/${user.username}`}>Hello, {user.firstName}</NavLink>
        <NavLink to={`/user/${user.username}/bookmarks`}>Bookmarks</NavLink>
        <Button text='Logout' handler={handleLogout} />
      </>
      :
      <>
        <NavLink to='/user/login'>Login</NavLink>
        <NavLink to='/user/register'>Register</NavLink>
      </>
      }
    </nav>
  )
}

export default Nav;