import LoginPage from './pages/login';
import UsersPage from './pages/users'
// import { Route, Switch } from "react-router-dom";
import { Route, Routes,  BrowserRouter as Router  } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <main>
      <div className=''>
        <div className='main-wrapp'>
          <div className='sidebar-wrap'>
            <div className='list-links'>
              <ul>
                <li>
                  <a href=''>Link 1</a>
                </li>
                <li>
                  <a href=''>Link 1</a>
                </li>
                <li>
                  <a href=''>Link 1</a>
                </li>
              </ul>
              
              </div>
          </div>
          <div className='content-wrap'>
          <Router>
        <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/users" element={<UsersPage />}></Route>
        {/* <Route path="/cron" component={<CronPage />}></Route> */}
            {/* <Route component={Error} /> */}
        </Routes>
      </Router>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default App;



