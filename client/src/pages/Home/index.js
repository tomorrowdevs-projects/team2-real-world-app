import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './home.scss';
import { useAppContext } from '../../context/appContext';

const Home = () => {
  const { currentUser } = useAppContext();

  return (
    <main className='container-home d-flex align-items-center'>
      <section className='section-main'>
        <h1>X-Comm App services</h1>
        <div className='info-app'>
          <h3>Data security</h3>
          <p>Access to data only with authentication</p>
        </div>
        <div className='info-app info-link'>
          <Link to={'/upload'}>
            <h3>Upload file</h3>
            <p>Upload of large order lists, via a .csv file than 2GB</p>{' '}
          </Link>
        </div>
        <div className='info-app info-link'>
          <Link to={'/search'}>
            <h3>Search</h3>
            <p>Consultation and statistics of the uploaded data</p>
          </Link>
        </div>
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
