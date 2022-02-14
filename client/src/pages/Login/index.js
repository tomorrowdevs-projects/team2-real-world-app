import { Card } from 'react-bootstrap';
import './login.scss';
import SignInButton from '../../components/SignInButtons';

const Login = () => {
  return (
    <div className='container-login'>
      <Card className='pb-2'>
        <Card.Header>
          <h3 className='text-center'>Authenticate</h3>
        </Card.Header>
        <Card.Body>
          <SignInButton provider='Google' />
          <SignInButton provider='Facebook' />
          <SignInButton provider='GitHub' />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
