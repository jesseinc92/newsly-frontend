import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className='Footer'>
      <p onClick={handleScroll}>Back to top 
        <span className='Footer-scroll'>
          <FontAwesomeIcon icon={faAnglesUp} />
        </span>
      </p>
    </footer>
  )
}

export default Footer;