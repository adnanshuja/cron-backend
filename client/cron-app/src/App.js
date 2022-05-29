import LoginPage from './pages/login';
import UsersPage from './pages/users'
// import { Route, Switch } from "react-router-dom";
import { Route, Routes,  BrowserRouter as Router  } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <main>
      <Router>
        <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/users" element={<UsersPage />}></Route>
        {/* <Route path="/cron" component={<CronPage />}></Route> */}
            {/* <Route component={Error} /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;



