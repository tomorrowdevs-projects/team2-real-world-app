import { Alert, Spinner } from 'react-bootstrap';
import './alert-message.scss';
import { useAppContext } from '../../context/appContext';

const AlertMessage = () => {
  const { handleAlert, alert } = useAppContext();
  const { show, message, variant, dismissible, animation } = alert;
  return (
    <div className='alert-box mt-4 mb-auto d-flex justify-content-center'>
      {show && (
        <Alert
          className='mb-0'
          variant={variant}
          onClose={() => handleAlert(false)}
          dismissible={dismissible}
        >
          {message}
          <Spinner
            className='alert-spinner ms-2'
            animation={animation}
            size='sm'
            role='status'
          ></Spinner>
        </Alert>
      )}
    </div>
  );
};

export default AlertMessage;
