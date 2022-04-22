import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../UserContext';
import NewslyAPI from '../../api';
import './ArticlePage.css';
import Button from '../Button/Button';
import updateMetrics from '../../helpers/updateMetrics';

const ArticlePage = () => {
  const { articleId } = useParams();
  const { user, setUser, handleBookmark, hasBookmark, setHasBookmark } = useContext(UserContext);
  const body = useRef();
  const main = useRef();
  const metrics = useRef(user.metrics);
  const [articleData, setArticleData] = useState();
  

  useEffect(() => {
    const getSingleArticle = async () => {
      try {
        const article = await NewslyAPI.getSingleArticle(articleId);
        setArticleData(article);
      } catch(err) {
        alert(err);
      }
    }
    getSingleArticle();

    // Check to see if the article is bookmarked for
    // a logged in user. Also create a ref for the user
    // metrics for use at component unmount.
    if (user) {
      for (let bookmark of user.bookmarks) {
        if (bookmark.id === articleId) {
          setHasBookmark('Remove Bookmark');
        } 
      }
    }

    // Add HTML properties to destination divs
    if (main.current && body.current) {
      main.current.innerHTML = articleData.fields.main;
      body.current.innerHTML = articleData.fields.body;
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, 
      articleData?.fields.main, 
      articleData?.fields.body, 
      user?.bookmarks.length]);


  useEffect(() => {
        // Runs the metrics update on last component unmount
    return async () => {
      try {
        const newMetrics = updateMetrics(articleData?.sectionId, user.metrics);
        const resp = await NewslyAPI.updateMetrics(user.username, newMetrics);
        console.log(resp);
        setUser({ ...user, metrics: newMetrics })
        localStorage.setItem('user', JSON.stringify(user));
      } catch(err) {
        alert(err);
      }
    };
  }, [articleData?.sectionId])


  if (articleData) {
    return (
      <main className='ArticlePage'>
        <h1>{ articleData.webTitle }</h1>
        <p>{ articleData.fields.byline } | { articleData.sectionName } | 
          <Button 
            text={hasBookmark} 
            handler={() => handleBookmark(articleId, articleData.webTitle, articleData.sectionId, articleData.sectionName)} 
          />
        </p>
        <p className='ArticlePage-main' ref={main}>
          {/* Article main HTML is injected here. */}
        </p>
        <div className='ArticlePage-body' ref={body}>
          {/* Article body HTML is injected here. */}
        </div>
      </main>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
}

export default ArticlePage;