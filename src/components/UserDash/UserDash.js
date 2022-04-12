import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import NewslyAPI from '../../api';
import './UserDash.css';
import Button from '../Button/Button';

const UserDash = () => {
  const redirect = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const deleteUser = async () => {
    try {
      const deleteMessage = await NewslyAPI.deleteUser(user.username);

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
      <h2>Hello, {user.firstName}</h2>

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