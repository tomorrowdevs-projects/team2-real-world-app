import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import './buttons.scss';

const Buttons = ({ buttonList, className }) => {
  const navigate = useNavigate();

  if (buttonList) {
    return (
      <ButtonGroup className={className}>
        {buttonList.map((link, index) => (
          <Button
            variant='outline-dark'
            key={index}
            onClick={() => navigate(`/${link.path}`)}
          >
            {link.label}
          </Button>
        ))}
      </ButtonGroup>
    );
  } else {
    return <></>;
  }
};

export default Buttons;
