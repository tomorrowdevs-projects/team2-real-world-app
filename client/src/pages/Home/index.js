import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './home.scss';
import { useAppContext } from '../../context/appContext';

const Home = () => {
  const { currentUser } = useAppContext();

  return (
    <main className='container-home d-flex align-items-center'>
      <section className='section-main'>
        <h1>X-Comm App improves your business</h1>
        <h3 className='fst-italic mb-3'>Try our services</h3>
        <p>
          <Link to={'/upload'}>Upload of large order lists</Link>
        </p>
        <p>
          <Link to={'/search'}>
            Consultation and statistics of the uploaded data
          </Link>
        </p>
        {!currentUser && (
          <div className='d-flex justify-content-start d-lg-none mt-4'>
            <Link to='/login'>
              <Button variant='dark'>Authenticate</Button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
