import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useFormChange from "../../hooks/useFormChange";
import UserContext from "../../UserContext";
import NewslyAPI from '../../api';
import Button from "../Button/Button";

const RegistrationForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [loginPage, setLoginPage] = useState(1);
  const redirect = useNavigate();

  const [formData, handleChange] = useFormChange({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
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
        <section>
          <h2>Register today to become more mindful.</h2>
          <p>Already have an account? <Link to='/user/login'>Login</Link> here.</p>
          <form>
            <div className='input-group'>
              <label htmlFor='firstName'>First Name</label>
              <input id='firstName' name='firstName' type='text' value={formData.firstName} onChange={handleChange} />
            </div>

            <div className='input-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input id='lastName' name='lastName' type='text' value={formData.lastName} onChange={handleChange} />
            </div>
          <Button text='Continue' handler={() => setLoginPage(2)} />
          </form>
        </section>
      )
    }

    if (loginPage === 2) {
      return (
        <section>
          <form>
            <div className='input-group'>
              <label htmlFor='username'>Username</label>
              <input id='username' name='username' type='text' value={formData.username} onChange={handleChange} />
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input id='password' name='password' type='password' value={formData.password} onChange={handleChange} />
            </div>
          <Button text='Continue' handler={() => setLoginPage(3)} />
          </form>
        </section>
      )
    }

    if (loginPage === 3) {
      return (
        <section>
          <form onSubmit={handleRegister}>
            <div className='input-group'>
              <label htmlFor='username'>Select Your Goals</label>
              <p>Goal selections will be here...</p>
            </div>
            <input type='submit' value='Register' />
          </form>
        </section>
      )
    }
  } else {
    return <Navigate to='/' />
  }
}

export default RegistrationForm;