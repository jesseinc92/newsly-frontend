import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import HomePage from './components/HomePage/HomePage';
import FrontPage from './components/FrontPage/FrontPage';
import SearchPage from './components/SearchPage/SearchPage';
import ArticlePage from './components/ArticlePage/ArticlePage';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import UserDash from './components/UserDash/UserDash';
import Bookmarks from './components/Bookmarks/Bookmarks';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<HomePage />} />
          <Route path='front-page' element={<FrontPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='article/:articleId' element={<ArticlePage />} />
          <Route path='user'>
              <Route path='login' element={<LoginForm />} />
              <Route path='register' element={<RegistrationForm />} />
              <Route path=':username' element={<UserDash />} />
              <Route path=':username/bookmarks' element={<Bookmarks />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
