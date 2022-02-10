import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import UploadFile from '../pages/UploadFile';
import Queries from '../pages/Queries';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute user={true} />}>
            <Route path='upload' element={<UploadFile />} />
            <Route path='queries' element={<Queries />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
