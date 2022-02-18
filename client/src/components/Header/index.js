import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Buttons from '../Buttons';
import { pageLinks } from './button-list';
import Menu from '../Menu';
import Logo from '../Logo';
import { useAppContext } from '../../context/appContext';

const Header = ({ dNone }) => {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className='container-header'>
      <Container>
        <Row
          className='align-items-center justify-content-between'
          xs={2}
          lg={3}
        >
          <Col className='py-3'>
            <Logo navigate={navigate} to={'/'} />
          </Col>
          <Col
            className={`d-flex justify-content-center py-3 ${dNone}`}
            xs={{ order: 3, span: 12 }}
          >
            <Buttons buttonList={pageLinks} />
          </Col>
          <Col
            className={`d-flex justify-content-end ${dNone}`}
            lg={{ order: 3 }}
          >
            {!currentUser && (
              <Button
                className='d-none d-lg-block me-3'
                variant='dark'
                onClick={() => navigate('/login')}
              >
                Authenticate
              </Button>
            )}
            <Menu
              path='/dashboard'
              currentUser={currentUser}
              handleLogout={logout}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
