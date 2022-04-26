import React from 'react';
import { Link } from 'react-router-dom';
import categoryFilter from '../../helpers/categoryFilter';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {

  const escapedId = article.id.replaceAll('/', '%2F');
  const catClass = categoryFilter(article.sectionId);

  return (
    <Link className='ArticleCard-link' to={`/article/${escapedId}`}>
      <div className='ArticleCard'>
        <p className='ArticleCard-title'><strong>{ article.webTitle }</strong></p>
        <p className={`ArticleCard-cat-badge ${catClass}`}>{ article.sectionName }</p>
      </div>
    </Link>
  )
}

export default ArticleCard;