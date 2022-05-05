import React, { useEffect, useState } from "react";
import NewslyAPI from "../../api";
import usePagination from "../../hooks/usePagination";
import './SearchPage.css';
import ArticleCard from "../ArticleCard/ArticleCard";
import Button from "../Button/Button";

const SearchPage = () => {
  const [searchData, setSearchData] = useState({
    filter: 'keyword',
    term: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [pageNum, handlePagination] = usePagination();

  useEffect(() => {
    // retrieve saved search session on component mount.
    const savedSearch = JSON.parse(sessionStorage.getItem('sessionSearch'));
    if (savedSearch) {
      setSearchResults(savedSearch);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSearchData(data => ({
      ...data,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
    // make the search call once the form is submitted.
    const results = await NewslyAPI.searchArticles(searchData.term, searchData.filter);

    // save search results in session for later component visits.
    sessionStorage.setItem('sessionSearch', JSON.stringify(results));
    setSearchResults(results);
    } catch(err) {
      alert('Search found no results.')
    }
  }

  return (
    <main className='SearchPage'>
      <form className='SearchPage-form' onSubmit={handleSubmit}>
        <select name='filter' onChange={handleChange}>
          <option value='keyword'>Keyword</option>
          <option value='section'>Section</option>
        </select>
        <input 
          type='text'
          name='term'
          placeholder='Search for articles...' 
          value={searchData.term ?? ''} 
          onChange={handleChange} 
        />
      </form>
      <section className='SearchPage-results'>
        {searchResults.length > 0 ?
            searchResults.map(result => (
              <ArticleCard key={result.id} article={result}/>
            ))
          :
            <div className='SearchPage-loader'>
              <h1>&hellip;</h1>
            </div>
        }
      </section>

      { searchResults.length > 0 ?
        <div className='button-group page-count'>
            <Button text='previous' handler={handlePagination} />
            <p>Page { pageNum }</p>
            <Button text='next' handler={handlePagination} />
        </div>
        :
        <></>
      }
    </main>
  )
}

export default SearchPage;