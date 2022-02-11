import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate();
  const pageLinks = [
    { label: 'Log In', path: 'login' },
    { label: 'Sign Up', path: 'signup' },
  ];

  return (
    <>
      <h1>Header</h1>
      {pageLinks.map((link, index) => (
        <Button key={index} onClick={() => navigate(`/${link.path}`)}>
          {link.label}
        </Button>
      ))}
    </>
  );
};

export default Header;
