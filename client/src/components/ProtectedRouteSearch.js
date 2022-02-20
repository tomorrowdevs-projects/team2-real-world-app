import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRouteSearch = ({ user, fileUpload, children }) => {
  const { handleAlert } = useAppContext();

  useEffect(() => {
    let isMounted = true;
    if (!user) {
      handleAlert(true, 'Please, log in first.', 'info', false);
    } else if (user && !fileUpload) {
      handleAlert(true, 'Please, upload the file first.', 'info', false);
    }
    return () => (isMounted = false);
  }, [user, fileUpload, handleAlert]);

  if (!user) {
    return <Navigate to={'login'} />;
  } else if (user && !fileUpload) {
    return <Navigate to={'upload'} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRouteSearch;
