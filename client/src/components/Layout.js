import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import AlertMessage from './AlertMessage/AlertMessage';
import Footer from './Footer';
import ProgressBarUpload from './ProgessBarUpload/ProgressBarUpload';

const Layout = ({ dNone, children }) => {
  return (
    <div className='container-main'>
      <Header dNone={dNone} />
      <Container className='container-top'>
        <AlertMessage />
        <ProgressBarUpload />
      </Container>
      <Container className='container-center'>
        {children ? children : <Outlet />}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
