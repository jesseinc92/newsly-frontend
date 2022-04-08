import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  )
}

export default App;
