import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fullBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as emptyBookmark } from '@fortawesome/free-regular-svg-icons';
import categoryFilter from '../../helpers/categoryFilter';
import UserContext from '../../UserContext';
import NewslyAPI from '../../api';
import './ArticlePage.css';
import Footer from '../Footer/Footer';
import updateMetrics from '../../helpers/updateMetrics';

const ArticlePage = () => {
  const { articleId } = useParams();
  const refresh = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const body = useRef();
  const main = useRef();
  const [hasBookmark, setHasBookmark] = useState(false);
  const [catClass, setCatClass] = useState('undefined');
  const [articleData, setArticleData] = useState();

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
        console.log(deleteMessage);
        setHasBookmark(false);
      } else {
        const article = await NewslyAPI.createBookmark(user.username, articleId, articleTitle, sectionId, sectionName);
        console.log(article);
        setHasBookmark(true);
      }

      // Fetch updated user with new bookmark
      const updatedUser = await NewslyAPI.getUser(user.username);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log(updatedUser)
      setUser(updatedUser);
    } catch(err) {
      alert(err);
    }
  }
  

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
    console.log(user)
    if (user) {
      for (let bookmark of user.bookmarks) {
        if (bookmark.id === articleId) {
          setHasBookmark(true);
        } 
      }
    }

    

    // Add HTML properties to destination divs
    if (main.current && body.current) {
      setCatClass(categoryFilter(articleData.sectionId));
      main.current.innerHTML = articleData.fields.main;
      body.current.innerHTML = articleData.fields.body;
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user,
      articleId,
      articleData?.sectionId,
      articleData?.fields.main, 
      articleData?.fields.body, 
      user?.bookmarks.length]);


  useEffect(() => {
        // Runs the metrics update on last component unmount
    return async () => {
      if (user) {
        try {
          const newMetrics = updateMetrics(articleData?.sectionId, user?.metrics);
          const resp = await NewslyAPI.updateMetrics(user?.username, newMetrics);

          // get the most up-to-date user data in the event a user
          // has performed an add/remove bookmark action.
          const updatedUser = await NewslyAPI.getUser(user?.username);
          console.log(resp)
          console.log(updatedUser)
          setUser({ ...updatedUser, metrics: newMetrics })
          localStorage.setItem('user', JSON.stringify(user));
        } catch(err) {
          alert(err);
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleData?.sectionId])


  if (articleData) {
    return (
      <>
        <main className='ArticlePage'>
          <h1>{ articleData.webTitle }</h1>
          <p className='ArticlePage-byline'>{ articleData.fields.byline ? `by ${ articleData.fields.byline }` : ''}</p>

          <div className='ArticlePage-badge-bookmark-wrapper'>
            <span className={`ArticlePage-cat-badge ${catClass}`}>{ articleData.sectionName }</span>
            <span className='ArticlePage-bookmark' onClick={() => {
                handleBookmark(articleId, articleData.webTitle, articleData.sectionId, articleData.sectionName);
              }}
            >
              <FontAwesomeIcon icon={ hasBookmark ? fullBookmark : emptyBookmark } />
            </span>
          </div>
          
          <p className='ArticlePage-main' ref={main}>
            {/* Article main HTML is injected here. */}
          </p>
          <div className='ArticlePage-body' ref={body}>
            {/* Article body HTML is injected here. */}
          </div>
        </main>
        <Footer />
      </>
    )
  } else {
    return (
        <p>Loading...</p>
    )
  }
}

export default ArticlePage;