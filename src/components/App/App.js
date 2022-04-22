import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NewslyAPI from '../../api';
import UserContext from '../../UserContext';
import Nav from '../Nav/Nav';
import './App.css';

const App = () => {
  const refresh = useNavigate();
  const [hasBookmark, setHasBookmark] = useState('Add Bookmark');
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  const handleBookmark = async (articleId, articleTitle, sectionId, sectionName) => {
    // redirect if there is no logged-in user
    if (!user) {
      alert('You must be logged in to use this feature. Sign up or login to continue!');
      refresh('/user/login');
      return;
    }

    // check if the current article is already in the
    // user bookmarks
    let articleIsBookmarked;
    for (let bookmark of user.bookmarks) {
      if (bookmark.id === articleId) {
        articleIsBookmarked = true;
      }
    }

    try {
      if (articleIsBookmarked) {
        const deleteMessage = await NewslyAPI.removeBookmark(user.username, articleId);
        console.log(deleteMessage)
        setHasBookmark('Add Bookmark');
      } else {
        const article = await NewslyAPI.createBookmark(user.username, articleId, articleTitle, sectionId, sectionName);
        console.log(article)
        setHasBookmark('Remove Bookmark');
      }

      // Fetch updated user with new bookmark
      const updatedUser = await NewslyAPI.getUser(user.username);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch(err) {
      alert(err);
    }
  }

  const handleLogout = async () => {
    // Update metrics for retrieval in next user session
    

    // Remove user after all metrics updates
    localStorage.removeItem('user');
    setUser(null);
    refresh('/')
  }
 
  return (
    <div className="App">
      {/* Allows any components rendered inside to access the user object 
          and related functions for authentication, layout, 
          and redirect functions. */}
      <UserContext.Provider value={{ user, setUser, handleLogout, handleBookmark, hasBookmark, setHasBookmark }}>
        <Nav />
        <Outlet />
      </UserContext.Provider>
    </div>
  )
}

export default App;
