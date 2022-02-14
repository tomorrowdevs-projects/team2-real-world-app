import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import './sign-in-button.scss';

const SignInButton = ({ provider }) => {
  const icon = () => {
    switch (provider) {
      case 'Google':
        return <FcGoogle />;
      case 'Facebook':
        return <BsFacebook />;
      case 'GitHub':
        return <BsGithub />;
      default:
        return '';
    }
  };

  return (
    <div className='sign-in-btn d-flex align-items-center mt-2'>
      <div>
        <div className='sign-in-logo mb-1 ps-1 me-3'>{icon()}</div>
      </div>
      <span>Sign in with {provider}</span>
    </div>
  );
};

export default SignInButton;
