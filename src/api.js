const axios = require('axios');
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class NewslyAPI {

  // Authorization token
  static token;

  /** A request method that performs the calls to the backend.
   * 
   * @param {String} endpoint - Backend route
   * @param {Object} data - Request body to send to server
   * @param {String} method - What HTTP verb to call the endpoint
   * @returns Response object body
   */
  static async request(endpoint, data = {}, method = 'get') {
    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${NewslyAPI.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch(err) {
      console.error('API error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Interface between the frontend and the backend
   *  to fetch the newest stories for the FrontPage component.
   * 
   * @param {Integer} pageNum - Page number for front page results.
   */
  static async getNewestArticles(pageNum = 1) {
    const resp = await this.request(`/articles?page=${pageNum}`);
    return resp.articles;
  }

  /** 
   * 
   * @param {String} articleId - Single article ID
   */
  static async getSingleArticle(articleId) {
    const escapedId = articleId.replaceAll('/', '%2F');
    const resp = await this.request(`/articles/${escapedId}`);
    return resp.article;
  }

  /** Accepts filter parameters and makes the endpoint call
   *  to return search results based on the necessary filter.
   * 
   * @param {String} filterTerm - Keyword or section Id
   * @param {String} filterType - Keyword or section Id
   */
  static async searchArticles(filterTerm, filterType) {
    const resp = await this.request(`/articles/search?${filterType}=${filterTerm}`);
    return resp.articles;
  }
}

export default NewslyAPI;