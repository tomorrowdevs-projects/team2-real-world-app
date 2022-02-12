import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='container-main'>
      <Header />
      <Container className='container-center'>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
