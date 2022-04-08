import React, { useEffect, useState } from "react";
import NewslyAPI from "../../api";
import ArticleCard from "../ArticleCard/ArticleCard";

const SearchPage = () => {
  const [searchData, setSearchData] = useState({
    filter: 'keyword',
    term: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // allow search results to persist in session storage 
    // so user searches doesn't have to be continuously re-done
    // when navigating away from the results.
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

    // make the search call once the form is submitted.
    const results = await NewslyAPI.searchArticles(searchData.term, searchData.filter);
    setSearchResults(results);
    setSearchData({
      filter: '',
      ferm: ''
    });
  }

  return (
    <main className='SearchPage'>
      <form onSubmit={handleSubmit}>
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
            <p>Search results will appear here.</p>
        }
      </section>
    </main>
  )
}

export default SearchPage;