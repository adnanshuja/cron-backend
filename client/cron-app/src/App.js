import LoginPage from './pages/login';
import UsersPage from './pages/users';
import CronPage from './pages/cron';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/protectedRoute';
import BasicUser from './pages/basic-user';
import HomePage from './pages/home';
import ReportsPage from './pages/reports';
import CreateCron from './pages/create-cron';
function App() {
  return (
    <main>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/users" element={<ProtectedRoute allowedRoles={['admin', 'sub-admin']} ><UsersPage /></ProtectedRoute>}></Route>
                <Route path="crons" element={<ProtectedRoute allowedRoles={['admin', 'manager', 'sub-admin', 'user']} ><CronPage /></ProtectedRoute>}> 
                </Route>
                <Route path="/crons/create-cron" element={<ProtectedRoute allowedRoles={['admin']} ><CreateCron /></ProtectedRoute>}></Route>
                <Route path="/basic-user" element={<ProtectedRoute allowedRoles={['user']} ><BasicUser /></ProtectedRoute>}></Route>
                <Route path="/home" element={<ProtectedRoute allowedRoles={['manager', 'sub-admin', 'user', 'admin']} ><HomePage /></ProtectedRoute>}></Route>
                <Route path="/reports" element={<ProtectedRoute allowedRoles={['admin', 'manager']} ><ReportsPage /></ProtectedRoute>}></Route>
              </Routes>
            </Router>
    </main>
  );
}

export default App;



