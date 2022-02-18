import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './not-found.scss';

const NotFound = () => {
  return (
    <main className='container-not-found d-flex align-items-center'>
      <section className='section-main'>
        <h1>Sorry...</h1>
        <h3 className='fst-italic'>
          This page has not been <br /> invented yet!
        </h3>
        <div className='d-flex justify-content-start mt-4'>
          <Link to='/'>
            <Button variant='dark'>Back to Home</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
