import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import './Bookmarks.css';
import ArticleCard from '../ArticleCard/ArticleCard';

const Bookmarks = () => {
  const { user } = useContext(UserContext);

  return (
    <section className='Bookmarks'>
      <h2>Your bookmarks</h2>
      <div className='Bookmarks-container'>
        {console.log(user.bookmarks)}
        {user.bookmarks.map(bookmark => (
          <ArticleCard key={bookmark.id} article={bookmark} />
        ))}
      </div>
    </section>
  )
}

export default Bookmarks;