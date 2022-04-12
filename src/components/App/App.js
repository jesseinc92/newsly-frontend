import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import Nav from '../Nav/Nav';
import './App.css';

const App = () => {
  const refresh = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    refresh('/')
  }
 
  return (
    <div className="App">
      {/* Allows any components rendered inside to access the user object 
          and related functions for authentication, layout, 
          and redirect functions. */}
      <UserContext.Provider value={{ user, setUser, handleLogout }}>
        <Nav />
        <Outlet />
      </UserContext.Provider>
    </div>
  )
}

export default App;
