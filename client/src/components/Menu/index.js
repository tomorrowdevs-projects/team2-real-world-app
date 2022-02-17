import { useNavigate } from 'react-router';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import { ImExit } from 'react-icons/im';
import { MdSettings } from 'react-icons/md';
import './menu.scss';
import userIcon from '../../assets/images/user-icon.png';
import { getUserData } from '../../assets/scripts/utils/dataManagement';

const Menu = ({ currentUser, handleLogout, path }) => {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <Dropdown.Toggle variant='outline-dark' id='dropdown-user'>
        <img
          src={getUserData(currentUser, 'photo', userIcon)}
          alt='user profile'
          className='user-photo'
        />
      </Dropdown.Toggle>
      <Dropdown.Menu align='end'>
        <Dropdown.Header>
          {getUserData(currentUser, 'userName', userIcon)}
        </Dropdown.Header>
        <Dropdown.Header>
          {getUserData(currentUser, 'email', userIcon)}
        </Dropdown.Header>
        <NavDropdown.Divider />
        <Dropdown.Item
          disabled={currentUser === null}
          onClick={() => navigate(path)}
        >
          <MdSettings className='me-1' /> Account
        </Dropdown.Item>
        <Dropdown.Item disabled={currentUser === null} onClick={handleLogout}>
          <ImExit className='me-1' />
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Menu;
