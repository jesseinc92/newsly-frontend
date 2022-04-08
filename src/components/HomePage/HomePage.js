import React from 'react';
import Button from '../Button/Button';

const Homepage = () => {
  return (
    <main className='HomePage'>
      <h1>Newsly</h1>
      <p>The mindful app for mindful news consumption.</p>
      <div className='Button-group'>
        <Button text='Read' path='/front-page' />
        <Button text='Login' />
      </div>
    </main>
  )
}

export default Homepage;