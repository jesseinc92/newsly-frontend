const axios = require('axios');
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
//'https://newsly-news.herokuapp.com';


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
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch(err) {
      console.error('API error:', err.response?.data);
      let message = err.response?.data.error.message;
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

  /** Accepts the article id and encodes all '/' chars
   *  to transmit through the endpoint as a param.
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

  /** Accepts a new user object in the request body and
   *  calls the backend auth route responsible for user registration.
   * 
   * @param {Object} user - An object with all fields to create a new user
   */
  static async registerUser(user) {
    const resp = await this.request('/auth/register', { ...user }, 'post');
    this.token = resp.token;
  }

  /** Accepts a new user object in the request body and
   *  calls the backend auth route responsible for fetching a token.
   * 
   * @param {Object} user - User fields with login credentials
   */
  static async loginUser(user) {
    const resp = await this.request('/auth/token', { ...user }, 'post');
    this.token = resp.token;
  }

  /** Accepts a username to obtain user information from database.
   * 
   * @param {String} username - Username
   */
  static async getUser(username) {
    const resp = await this.request(`/user/${username}`);
    return resp.user;
  }

  /** Accepts a user object containing the username to retrieve
   *  user from the database, and name fields to update.
   * 
   * @param {Object} user - User fields with update information
   */
  static async updateUser({ username, firstName, lastName }) {
    const resp = await this.request(`/user/${username}`, { username, firstName, lastName }, 'put');
    return resp.user;
  }

  /** Accepts a username and calls the endoint to remove
   *  that user from the database. Cascades to remove any 
   *  linked metrics and bookmarks.
   * 
   * @param {String} username - Username
   */
  static async deleteUser(username) {
    const resp = await this.request(`/user/${username}`, {}, 'delete');
    this.token = null;
    return resp;
  }

  static async createBookmark(username, articleId, title, sectionId, sectionName) {
    const resp = await this.request(`/user/${username}/bookmarks`, { articleId, title, sectionId, sectionName }, 'post');
    return resp.article;
  }

  static async removeBookmark(username, articleId) {
    const resp = await this.request(`/user/${username}/bookmark`, { articleId }, 'delete');
    return resp;
  }

  static async updateMetrics(username, metrics) {
    const resp = await this.request(`/user/${username}/metrics`, { metrics }, 'post');
    return resp.response;
  }

  static async updateGoal(username, goal) {
    console.log(goal)
    const resp = await this.request(`/user/${username}/goals`, { goal }, 'post');
    return resp.metrics;
  }
}

export default NewslyAPI;