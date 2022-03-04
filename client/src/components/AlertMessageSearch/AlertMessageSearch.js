import { Alert, Spinner } from 'react-bootstrap';
import './alert-message-search.scss';

const AlertMessageSearch = ({ alert }) => {
  const { show, message, variant, dismissible, animation } = alert;
  return (
    <div className='alert-box'>
      {show && (
        <Alert
          className='alert-message-box'
          variant={variant}
          dismissible={dismissible}
        >
          {message}
          <Spinner
            className='alert-spinner ms-2 minor-loading'
            animation={animation}
            size='sm'
            role='status'
          ></Spinner>
        </Alert>
      )}
    </div>
  );
};

export default AlertMessageSearch;
