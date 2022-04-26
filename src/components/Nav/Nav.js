import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import anime from 'animejs';
import UserContext from '../../UserContext';
import './Nav.css';
import Button from '../Button/Button';

const Nav = () => {
  const { user, handleLogout } = useContext(UserContext);
  const [active, setActive] = useState();

  const toggleMenu = () => {
    setActive(active => !active);
  }

  useEffect(() => {
    if (active === true) {
      anime({
        targets: '.Nav-close-wrapper',
        height: ['0vh', '100vh'],
        easing: 'easeOutExpo'
      });

      anime({
        targets: '.Nav a',
        translateY: ['-5vh', 0],
        opacity: [0, 1],
        delay: (el, i) => (i * 100) + 300,
        easing: 'easeInSine',
        duration: 100
      })
    } 
    if (active === false) {
      anime({
        targets: '.Nav-close-wrapper',
        height: ['100vh', '0vh'],
        easing: 'easeInQuad',
        duration: 500
      })
    }
  }, [active]);

  return (
    <nav className='Nav'>
      <div className='Nav-burger-wrapper' onClick={toggleMenu}>
          <div className='Nav-burger'>
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>

      { user ? 
        <div className='Nav-profile-wrapper'>
          <Link to={`/user/${user.username}`}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
        :
        <></>
      }

      <div className='Nav-close-wrapper'>
        <div className='Nav-close' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      
        <div className='Nav-links'>
          <NavLink to='/' onClick={toggleMenu}>Home</NavLink>
          <NavLink to='/front-page' onClick={toggleMenu}>Front Page</NavLink>
          <NavLink to='/search' onClick={toggleMenu}>Search</NavLink> 
          {user ?
          <>
            <NavLink to={`/user/${user.username}`} onClick={toggleMenu}>Hello, {user.firstName}</NavLink>
            <NavLink to={`/user/${user.username}/bookmarks`} onClick={toggleMenu}>Bookmarks</NavLink>
            <Button text='Logout' handler={() => { handleLogout(); toggleMenu(); }} />
          </>
          :
          <>
            <NavLink to='/user/login' onClick={toggleMenu}>Login</NavLink>
            <NavLink to='/user/register' onClick={toggleMenu}>Register</NavLink>
          </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav;