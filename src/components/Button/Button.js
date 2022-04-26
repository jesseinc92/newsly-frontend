import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ text, path = '', handler = function(){} }) => {
  return (
    <button className='Button' onClick={handler}>
      <Link to={path}>
        { text }
      </Link>
    </button>
  )
}

export default Button;