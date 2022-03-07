import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRouteSearch = ({ user, isDataAvailable, children }) => {
  const { handleAlert, showProgressBar } = useAppContext();

  useEffect(() => {
    if (!user) {
      handleAlert(true, 'Please, log in first.', 'info', false);
    } else if (!showProgressBar && user && !isDataAvailable) {
      handleAlert(true, 'Please, upload the file first.', 'info', false);
    }
  }, [showProgressBar, user, isDataAvailable, handleAlert]);

  if (!user) {
    return <Navigate to={'login'} />;
  } else if (user && !isDataAvailable) {
    return <Navigate to={'upload'} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRouteSearch;
