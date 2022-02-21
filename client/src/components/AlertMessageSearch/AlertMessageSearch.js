import { Alert, Spinner } from 'react-bootstrap';
import './alert-message-search.scss';

const AlertMessageSearch = ({ alert, handleAlert }) => {
  const { show, message, variant, dismissible, animation } = alert;
  return (
    <div className='alert-box mt-3 mb-0 mx-auto'>
      {show && (
        <Alert
          className='mb-0 alert-message-box'
          variant={variant}
          onClose={() => handleAlert(false)}
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
