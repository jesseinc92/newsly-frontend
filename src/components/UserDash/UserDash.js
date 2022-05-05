import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import useFormChange from '../../hooks/useFormChange';
import changeCamelNames from '../../helpers/changeCamelNames';
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
    if (goal) {
      setGoal(false);
    }
    setEdit(edit => !edit);
  }

  const showGoalForm = () => {
    if (edit) {
      setEdit(false);
    }
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
      console.log(updatedGoal)
      
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
      <h1>Hello, { user.firstName }</h1>

      <div className='UserDash-metrics-box'>
        <h2>Your News by the Numbers</h2>

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
            <input type='submit' value='Save'/>
          </form>
          :
          <>
            <p className='metrics-graph-goal'>You want to view more { changeCamelNames(user.metrics.goal) ?? 'undecided' }.</p>
            <div className='metrics-graph'>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat usNews'>US</span>
                <span>{ user.metrics.usNews }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.usNews}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat worldNews'>World</span>
                <span>{ user.metrics.worldNews }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.worldNews}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat business'>Business</span>
                <span>{ user.metrics.business }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.business}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat opinion'>Opinion</span>
                <span>{ user.metrics.opinion }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.opinion}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat sport'>Sport</span>
                <span>{ user.metrics.sport }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.sport}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat culture'>Culture</span>
                <span>{ user.metrics.culture }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.culture}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat science'>Science</span>
                <span>{ user.metrics.science }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.science}rem`}}></span>
              </div>
              <div className='metrics-bundle'>
                <span className='UserDash-metrics-cat lifestyle'>Lifestyle</span>
                <span>{ user.metrics.lifestyle }</span>
                <span className='metrics-bar' style={{ height: `${user.metrics.lifestyle}rem`}}></span>
              </div>
            </div>
            <div className='metrics-interpretation'>
              <p>{ interpretMetrics(user.metrics) }</p>
            </div>
          </>
        }

        <Button text='Update Goal' handler={showGoalForm} />
        <Button text='Edit User Details' handler={showEditForm} />
      </div>

      <div className='UserDash-prof-details'>
        { edit ? 
          <form onSubmit={editUser}>
            <div className='input-group'>
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
            <div className='input-group'>
              <label htmlFor='lastName'><strong>Last Name: </strong></label>
              <input 
                type='text' 
                id='lastName'
                name='lastName' 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>
            <input type='submit' value='Save' />
          </form>
          :
          <>
          </>
        }
      </div>

      <div className='UserDash-delete-box'>
        <Button text='Delete Account' handler={deleteUser} />
        <span>
          Doing this will remove all of your bookmarks and will erase 
          all of your metrics. This can't be undone!
        </span>
      </div>
    </section>
  )
}

export default UserDash;