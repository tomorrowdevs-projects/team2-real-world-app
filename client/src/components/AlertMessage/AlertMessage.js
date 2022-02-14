import { Alert, Spinner, Stack, Row, Col } from 'react-bootstrap';

const AlertMessage = ({
  alert,
  handleAlert,
  show,
  message,
  variant,
  dismissible,
  animation,
}) => {
  return (
    <Row className='alert-box'>
      <Col>
        <Stack direction='horizontal' gap={3}>
          {show && (
            <Alert
              variant={variant}
              onClose={() => handleAlert(false)}
              dismissible={dismissible}
            >
              {message}
              <Spinner
                className='alert-spinner'
                animation={animation}
                size='sm'
                role='status'
              ></Spinner>
            </Alert>
          )}
        </Stack>
      </Col>
    </Row>
  );
};

export default AlertMessage;
