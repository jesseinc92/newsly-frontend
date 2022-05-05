import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import anime from 'animejs';
import UserContext from '../../UserContext';
import './Nav.css';

const Nav = () => {
  const { user, handleLogout } = useContext(UserContext);
  const desktopMenu = useRef();
  const [active, setActive] = useState();

  const toggleMobileMenu = () => {
    // disable toggle if screen is laptop/desktop sized
    if (window.innerWidth < 1024) setActive(active => !active);
  }

  // effect for mobile menu animations
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
      <div className='Nav-burger-wrapper' onClick={toggleMobileMenu}>
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

      <div className='Nav-close-wrapper' ref={desktopMenu}>
        <div className='Nav-close' onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      
        <div className='Nav-links'>
          <NavLink to='/' onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to='/front-page' onClick={toggleMobileMenu}>Front Page</NavLink>
          <NavLink to='/search' onClick={toggleMobileMenu}>Search</NavLink> 
          {user ?
          <>
            <NavLink to={`/user/${user.username}`} onClick={toggleMobileMenu}>Hello, {user.firstName}</NavLink>
            <NavLink to={`/user/${user.username}/bookmarks`} onClick={toggleMobileMenu}>Bookmarks</NavLink>
            <Link to='' onClick={() => { handleLogout(); toggleMobileMenu(); }} >Logout</Link>
          </>
          :
          <>
            <NavLink to='/user/login' onClick={toggleMobileMenu}>Login</NavLink>
            <NavLink to='/user/register' onClick={toggleMobileMenu}>Register</NavLink>
          </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav;