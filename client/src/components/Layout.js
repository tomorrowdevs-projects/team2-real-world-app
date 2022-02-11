import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavApp from './NavApp';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <NavApp />
      <hr />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
