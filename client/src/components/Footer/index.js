import { Container } from 'react-bootstrap';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import './footer.scss';

const Footer = () => {
  return (
    <footer className='container-footer d-flex align-items-center'>
      <Container>
        <div className='d-sm-flex justify-content-between text-center'>
          <span>© 2021 Company, Inc. All rights reserved.</span>
          <div className='social-icon'>
            <AiFillGithub />
            <AiFillLinkedin />
            <AiFillFacebook />
            <AiFillTwitterSquare />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
