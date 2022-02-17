import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  const { handleAlert } = useAppContext();

  useEffect(() => {
    !user && handleAlert(true, 'Please, log in first.', 'info', false);
  }, [user, handleAlert]);

  if (!user) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
