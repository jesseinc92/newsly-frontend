import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import Button from '../Button/Button';

const Homepage = () => {
  const { user } = useContext(UserContext);

  return (
    <main className='HomePage'>
      <h1>Newsly</h1>
      <p>The mindful app for mindful news consumption.</p>
      <div className='Button-group'>
        <Button text='Read' path='/front-page' />
        { !user && <Button text='Login' path='/user/login' /> }
      </div>
    </main>
  )
}

export default Homepage;