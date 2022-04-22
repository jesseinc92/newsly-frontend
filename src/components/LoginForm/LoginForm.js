import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useFormChange from "../../hooks/useFormChange";
import UserContext from "../../UserContext";
import NewslyAPI from "../../api";
import Button from '../Button/Button';

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const redirect = useNavigate();

  const [formData, handleChange] = useFormChange({
      username: '',
      password: ''
  });

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await NewslyAPI.loginUser(formData);

      // API call to get user
      const loggedUser = await NewslyAPI.getUser(formData.username);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUser(loggedUser);

      // Once form is submitted redirect back to homepage.
      redirect('/');
    } catch(err) {
      alert(err);
    }
  }

  if (!user) {
    return (
      <main>
        <p>Don't yet have an account? <Link to='/user/register'>Sign Up</Link> here.</p>
        <form onSubmit={handleLogin}>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input 
              id='username' 
              name='username' 
              type='text' 
              value={formData.username} 
              onChange={handleChange} 
              autoFocus
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input 
              id='password' 
              name='password' 
              type='password' 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <Button text='Login' />
        </form>
      </main>
    )
  } else {
    return <Navigate to='/' />
  }
}

export default LoginForm;