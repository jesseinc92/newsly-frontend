import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, path = '', handler = function(){} }) => {
  return (
    <button onClick={handler}>
      <Link to={path}>
        { text }
      </Link>
    </button>
  )
}

export default Button;