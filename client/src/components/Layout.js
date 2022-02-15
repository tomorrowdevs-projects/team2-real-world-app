import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import AlertMessage from './AlertMessage/AlertMessage';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='container-main'>
      <Header />
      <AlertMessage />
      <Container className='container-center'>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
