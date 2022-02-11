import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavApp = () => {
  const navigate = useNavigate();
  const pageLinks = [
    { label: 'Home', path: '' },
    { label: 'Upload file', path: 'upload' },
    { label: 'Queries', path: 'queries' },
  ];
  return (
    <>
      <hr />
      {pageLinks.map((link, index) => (
        <Button key={index} onClick={() => navigate(`/${link.path}`)}>
          {link.label}
        </Button>
      ))}
    </>
  );
};

export default NavApp;
