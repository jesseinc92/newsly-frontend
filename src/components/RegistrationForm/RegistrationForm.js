import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useFormChange from "../../hooks/useFormChange";
import UserContext from "../../UserContext";
import NewslyAPI from '../../api';
import './RegistrationForm.css';
import Button from "../Button/Button";

const RegistrationForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [loginPage, setLoginPage] = useState(1);
  const redirect = useNavigate();

  const [formData, handleChange] = useFormChange({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    goal: ''
  });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await NewslyAPI.registerUser(formData);

      // API call to get user
      const loggedUser = await NewslyAPI.getUser(formData.username);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUser(loggedUser);

      // Once form is submitted redirect back to homepage.
      redirect('/')
    } catch(err) {
      alert(err)
      setLoginPage(1);
    }
  }

  if (!user) {
    if (loginPage === 1) {
      return (
        <section className='RegistrationForm'>
          <h2>Register today to become more mindful.</h2>
          <p>Already have an account? <Link className='underlined-link' to='/user/login'>Login</Link> here.</p>
          <form>
            <div className='input-group'>
              <label htmlFor='firstName'>First Name</label>
              <input 
                id='firstName' 
                name='firstName' 
                type='text' 
                value={formData.firstName} 
                onChange={handleChange} 
                autoFocus 
              />
            </div>

            <div className='input-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input 
                id='lastName' 
                name='lastName' 
                type='text' 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>

            <div className='input-group'>
              <label htmlFor='username'>Username</label>
              <input 
                id='username' 
                name='username' 
                type='text' 
                value={formData.username} 
                onChange={handleChange}  
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
          <Button text='Next' handler={() => setLoginPage(2)} />
          </form>
        </section>
      )
    }

    if (loginPage === 2) {
      return (
        <section className='RegistrationForm'>
          <form onSubmit={handleRegister}>
              <div className='headline-group-goal'>
                <h2>Select Your Goal</h2>
                <span>You can only select one. Don't worry, you can change this later.</span>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='all' name='goal' value='all' onChange={handleChange} />
                <label className='goal-label' htmlFor='all'>I want to keep up to speed with all types of news.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='usNews' name='goal' value='usNews' onChange={handleChange} />
                <label className='goal-label' htmlFor='usNews'>US News is where I want to spend my time.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='worldNews' name='goal' value='worldNews' onChange={handleChange} />
                <label className='goal-label' htmlFor='worldNews'>I need to read more World News.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='business' name='goal' value='business' onChange={handleChange} />
                <label className='goal-label' htmlFor='business'>I'd like to read more about business.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='opinion' name='goal' value='opinion' onChange={handleChange} />
                <label className='goal-label' htmlFor='opinion'>I'd like to know what others think about current events.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='science' name='goal' value='science' onChange={handleChange} />
                <label className='goal-label' htmlFor='science'>I want to keep up with science.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='culture' name='goal' value='culture' onChange={handleChange} />
                <label className='goal-label' htmlFor='culture'>Cultural news matters more to me.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='sports' name='goal' value='sports' onChange={handleChange} />
                <label className='goal-label' htmlFor='sports'>I want to be up to date on the latest sports news.</label>
              </div>
              <div className='input-group goal-group'>
                <input type='radio' id='lifestyle' name='goal' value='lifestyle' onChange={handleChange} />
                <label className='goal-label' htmlFor='lifestyle'>Lifestyle is where I want to spend my time.</label>
              </div>
            <input className='RegistrationForm-submit' type='submit' value='Register' />
          </form>
        </section>
      )
    }
  } else {
    return <Navigate to='/' />
  }
}

export default RegistrationForm;