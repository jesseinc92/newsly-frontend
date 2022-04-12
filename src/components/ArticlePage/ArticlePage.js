import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../UserContext';
import NewslyAPI from '../../api';
import './ArticlePage.css';

const ArticlePage = () => {
  const { articleId } = useParams();
  const { user } = useContext(UserContext);
  const body = useRef();
  const main = useRef();
  const [articleView, setArticleView] = useState({
    webTitle: '',
    sectionName: '',
    fields: {
      byline: '',
      main: '',
      trailText: '',
      body: ''
    }
  });

  useEffect(() => {
    const getSingleArticle = async () => {
      const article = await NewslyAPI.getSingleArticle(articleId);
      setArticleView(article);
    }
    getSingleArticle();

    main.current.innerHTML = articleView.fields.main;
    body.current.innerHTML = articleView.fields.body;
  }, [articleId, articleView.fields.main, articleView.fields.body]);

  return (
    <main className='ArticlePage'>
      <h1>{ articleView.webTitle }</h1>
      <p>{ articleView.fields.byline } | { articleView.sectionName }</p>
      <p className='ArticlePage-main' ref={main}>
        {/* Article main HTML is injected here. */}
      </p>
      <div className='ArticlePage-body' ref={body}>
        {/* Article body HTML is injected here. */}
      </div>
    </main>
  )
}

export default ArticlePage;