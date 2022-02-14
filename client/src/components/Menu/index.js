import { useNavigate } from 'react-router';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import { ImExit } from 'react-icons/im';
import { MdSettings } from 'react-icons/md';
import userIcon from '../../assets/images/user-icon.png';

const Menu = ({ currentUser, handleLogout, path }) => {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <Dropdown.Toggle variant='outline-dark' id='dropdown-basic'>
        <img
          src={userIcon}
          alt='user profile'
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            marginRight: '3px',
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu align='end'>
        <Dropdown.Header></Dropdown.Header>
        <Dropdown.Header></Dropdown.Header>
        <NavDropdown.Divider />
        <Dropdown.Item href='#/action-1' onClick={() => navigate(path)}>
          <MdSettings className='me-1' /> Account
        </Dropdown.Item>
        <Dropdown.Item
          href='#/action-3'
          disabled={!currentUser}
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
