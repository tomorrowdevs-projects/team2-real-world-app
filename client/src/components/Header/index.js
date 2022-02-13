import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './header.scss';
import Buttons from '../Buttons';
import { pageLinks, logSignLinks } from '../Buttons/button-list';
import Menu from '../Menu';
import Logo from '../Logo.js';

const Header = () => {
  return (
    <div className='container-header'>
      <Container>
        <Row className='gy-3 align-items-center'>
          <Col className='p-3 d-flex align-items-center'>
            <Link className='navbar-brand' to='/'>
              <Logo />
            </Link>
          </Col>
          <Col className='d-none d-lg-block'>
            <Buttons buttonList={pageLinks} />
          </Col>
          <Col
            xs='auto'
            className=' d-flex justify-content-end align-items-center'
          >
            <Buttons buttonList={logSignLinks} className='d-none d-lg-block' />
            <Menu path='/dashboard' />
          </Col>
        </Row>
        <Row xs={1} className='d-lg-none gy-2 align-items-center'>
          <Col className=' d-flex justify-content-center p-3'>
            <Buttons buttonList={pageLinks} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
