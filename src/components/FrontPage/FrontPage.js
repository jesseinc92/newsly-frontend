import React, { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import NewslyAPI from '../../api';
import ArticleCard from '../ArticleCard/ArticleCard';
import Button from '../Button/Button';
import './FrontPage.css';

const FrontPage = () => {
  const [articles, setArticles] = useState([]);
  const [pageNum, handlePagination] = usePagination();

  useEffect(() => {
    const getArticles = async () => {
      const newestArticles = await NewslyAPI.getNewestArticles(pageNum);
      setArticles(newestArticles);
    }
    getArticles();

    // scroll to the top of the page on every change
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }, [pageNum]);

  return (
    <main className='FrontPage'>
      <h1>Front Page</h1>

      <section className='FrontPage-articles'>
        {articles.length > 0 ?
          articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))
          :
          <p>Loading...</p>
        } 
      </section>

      <div className='button-group page-count'>
          <Button text='previous' handler={handlePagination} />
          <p>Page { pageNum }</p>
          <Button text='next' handler={handlePagination} />
      </div>
    </main>
  )
}

export default FrontPage;