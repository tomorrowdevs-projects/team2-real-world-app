import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavApp from './NavApp';

const Layout = () => {
  return (
    <>
      <Header />
      <NavApp />
      <hr />
      <Outlet />
    </>
  );
};

export default Layout;
