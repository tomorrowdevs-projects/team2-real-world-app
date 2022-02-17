import { Card, ListGroup } from 'react-bootstrap';
import { ImExit } from 'react-icons/im';
import './dashboard.scss';
import { useAppContext } from '../../context/appContext';
import userIcon from '../../assets/images/user-icon.png';
import { getUserData } from '../../assets/scripts/utils/dataManagement';

const Dashboard = () => {
  const { currentUser, logout } = useAppContext();

  return (
    <div className='container-dashboard'>
      <Card>
        <Card.Header className='d-flex justify-content-between'>
          <h1>Dashboard</h1>
          <img
            src={getUserData(currentUser, 'photo', userIcon)}
            alt='user profile'
            className='user-photo'
          />
        </Card.Header>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            Name: {getUserData(currentUser, 'userName')}
          </ListGroup.Item>
          <ListGroup.Item>
            Email: {getUserData(currentUser, 'email')}
          </ListGroup.Item>
          <ListGroup.Item className='dashboard-logout' onClick={logout}>
            <ImExit className='me-1' />
            Log Out
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Dashboard;
