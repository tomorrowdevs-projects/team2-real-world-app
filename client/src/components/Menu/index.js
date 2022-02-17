import { useNavigate } from 'react-router';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import { ImExit } from 'react-icons/im';
import { MdSettings } from 'react-icons/md';
import './menu.scss';
import userIcon from '../../assets/images/user-icon.png';

const Menu = ({ currentUser, handleLogout, path }) => {
  const navigate = useNavigate();

  const getData = data => {
    if (currentUser) {
      return currentUser[data];
    } else if (data !== 'photo') {
      return '';
    } else {
      return userIcon;
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant='outline-dark' id='dropdown-user'>
        <img src={getData('photo')} alt='user profile' className='user-photo' />
      </Dropdown.Toggle>
      <Dropdown.Menu align='end'>
        <Dropdown.Header>{getData('userName')}</Dropdown.Header>
        <Dropdown.Header>{getData('email')}</Dropdown.Header>
        <NavDropdown.Divider />
        <Dropdown.Item
          href='#/action-1'
          disabled={currentUser === null}
          onClick={() => navigate(path)}
        >
          <MdSettings className='me-1' /> Account
        </Dropdown.Item>
        <Dropdown.Item
          href='#/action-3'
          disabled={currentUser === null}
          onClick={handleLogout}
        >
          <ImExit className='me-1' />
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Menu;
