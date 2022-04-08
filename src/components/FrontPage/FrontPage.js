import React, { useEffect, useState } from 'react';
import NewslyAPI from '../../api';
import ArticleCard from '../ArticleCard/ArticleCard';
import Button from '../Button/Button';
import './FrontPage.css';

const FrontPage = () => {
  const [articles, setArticles] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const handlePagination = (e) => {

    // TODO: Fix pagination
    if (e.target.innerText === 'previous' && pageNum !== 1) {
      setPageNum(num => num - 1);
    }
    if (e.target.innetText === 'next') setPageNum(num => num + 1);
    console.log(pageNum)
  }

  useEffect(() => {
    const getArticles = async () => {
      const newestArticles = await NewslyAPI.getNewestArticles(pageNum);
      setArticles(newestArticles);
    }
    getArticles();
  }, [pageNum]);

  return (
    <main className='FrontPage'>
      <h1>Front Page</h1>

      <section className='FrontPage-articles'>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>

      <div className='button-group'>
          <Button text='previous' handler={handlePagination} />
          <Button text='next' handler={handlePagination} />
      </div>
    </main>
  )
}

export default FrontPage;