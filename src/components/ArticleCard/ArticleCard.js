import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {

  const escapedId = article.id.replaceAll('/', '%2F');

  return (
    <Link className='ArticleCard-link' to={`/article/${escapedId}`}>
      <div className='ArticleCard'>
        <p>{ article.webTitle }</p>
        <p>{ article.sectionName }</p>
      </div>
    </Link>
  )
}

export default ArticleCard;