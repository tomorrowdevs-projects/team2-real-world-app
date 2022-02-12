import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './header.scss';
import logo from '../../assets/images/logo192.png';
import Buttons from '../Buttons';
import { pageLinks, logSignLinks } from '../Buttons/button-list';
import Menu from '../Menu';

const Header = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className='container-header'>
      <Container>
        <Row className='gy-3 align-items-center'>
          <Col className='p-3'>
            <Link className='navbar-brand' to='/'>
              <img alt='' src={logo} width='30' height='30' /> E-Comm App
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
