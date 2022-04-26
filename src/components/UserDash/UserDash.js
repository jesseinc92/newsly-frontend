import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import useFormChange from '../../hooks/useFormChange';
import interpretMetrics from '../../helpers/interpretMetrics';
import NewslyAPI from '../../api';
import './UserDash.css';
import Button from '../Button/Button';

const UserDash = () => {
  const redirect = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [goal, setGoal] = useState(false);

  const showEditForm = () => {
    setEdit(edit => !edit);
  }

  const showGoalForm = () => {
    setGoal(edit => !edit);
  }

  const [formData, handleChange] = useFormChange({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
  });

  const [goalData, handleGoalChange] = useFormChange({ goal: user.metrics.goal })

  const editUser = async (e) => {
    e.preventDefault();
    try  {
      const updatedUser = await NewslyAPI.updateUser(formData);
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEdit(false);
    } catch(err) {
      alert(err);
    }
  }

  const updateGoal = async (e) => {
    e.preventDefault();
    console.log(goalData)
    try {
      const updatedGoal = await NewslyAPI.updateGoal(user.username, goalData);
      const updatedUser = await NewslyAPI.getUser(user.username)

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setGoal(false);
    } catch(err) {
      alert(err);
    }
  }

  const deleteUser = async () => {
    try {
      const deleteMessage = await NewslyAPI.deleteUser(user.username);
      alert(deleteMessage);

      // Logout user after they are deleted from database
      localStorage.removeItem('user');
      setUser(null);
      redirect('/');
    } catch(err) {
      alert(err);
    }
  }

  return (
    <section className='UserDash'>
      <h2>Hello, { user.firstName }</h2>

      <div className='UserDash-prof-details'>
        <h4>User Details</h4>
        <Button text='Edit' handler={showEditForm} />

        { edit ? 
          <form onSubmit={editUser}>
            <div>
              <label htmlFor='firstName'><strong>First Name: </strong></label>
              <input 
                type='text' 
                id='firstName' 
                name='firstName' 
                value={formData.firstName} 
                onChange={handleChange} 
                autoFocus 
              />
            </div>
            <div>
              <label htmlFor='lastName'><strong>Last Name: </strong></label>
              <input 
                type='text' 
                id='lastName' 
                name='lastName' 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>
            <Button text='Save' />
          </form>
          :
          <>
            <p><strong>Username:</strong> { user.username }</p>
            <p><strong>First Name:</strong> { user.firstName }</p>
            <p><strong>Last Name:</strong> { user.lastName }</p>
          </>
        }
      </div>

      
      <div className='UserDash-metrics-box'>
        <h3>Your News by the Numbers</h3>
        <Button text='Update' handler={showGoalForm} />

        { goal ?
          <form onSubmit={updateGoal}>
            <div>
              <label htmlFor='goals'><strong>I want my goal to be: </strong></label>
              <select name='goal' id='goals' value={goalData.goal} onChange={handleGoalChange}>
                <option value='all'>All</option>
                <option value='usNews'>US News</option>
                <option value='worldNews'>World News</option>
                <option value='business'>Business</option>
                <option value='opinion'>Opinion</option>
                <option value='sport'>Sport</option>
                <option value='culture'>Culture</option>
                <option value='science'>Science</option>
                <option value='lifestyle'>Lifestyle</option>
              </select>
            </div>
            <Button text='Save'/>
          </form>
          :
          <>
            <div className='metrics-graph'>
              <p>You want to { user.metrics.goal ?? 'undecided' }.</p>
              <p><span className='UserDash-metrics-cat usNews'>US News</span> { user.metrics.usNews }</p>
              <p><span className='UserDash-metrics-cat worldNews'>World News</span> { user.metrics.worldNews }</p>
              <p><span className='UserDash-metrics-cat business'>Business</span> { user.metrics.business }</p>
              <p><span className='UserDash-metrics-cat opinion'>Opinion</span> { user.metrics.opinion }</p>
              <p><span className='UserDash-metrics-cat sport'>Sport</span> { user.metrics.sport }</p>
              <p><span className='UserDash-metrics-cat culture'>Culture</span> { user.metrics.culture }</p>
              <p><span className='UserDash-metrics-cat science'>Science</span> { user.metrics.science }</p>
              <p><span className='UserDash-metrics-cat lifestyle'>Lifestyle</span> { user.metrics.lifestyle }</p>
            </div>
            <div className='metrics-interpretation'>
              <p>{ interpretMetrics(user.metrics) }</p>
            </div>
          </>
        }
      </div>

      <div className='UserDash-delete-box'>
        <Button text='Delete Account' handler={deleteUser} />
        <span>
          Doing this will remove all of your bookmarked articles and will erase 
          all of your saved goal progress. Be sure this is what you want to do, 
          there's no going back.
        </span>
      </div>
    </section>
  )
}

export default UserDash;