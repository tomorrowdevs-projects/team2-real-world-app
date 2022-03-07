import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteSearch from './ProtectedRouteSearch';
import Home from '../pages/Home';
import UploadFile from '../pages/UploadFile';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import { useAppContext } from '../context/appContext';

function App() {
  const { currentUser, isDataAvailable } = useAppContext();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route path='upload' element={<UploadFile />} />
        </Route>
        <Route
          element={
            <ProtectedRouteSearch
              user={currentUser}
              isDataAvailable={isDataAvailable}
            />
          }
        >
          <Route path='search' element={<Search />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
      <Route
        path='*'
        element={
          <Layout dNone='d-none'>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
