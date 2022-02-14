import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './home.scss';

const Home = () => {
  return (
    <main className='container-home d-flex align-items-center'>
      <section className='section-main'>
        <h1>X-Comm App improves your business</h1>
        <p>Try our services</p>
        <p>Upload of large order lists</p>
        <p>Consultation and statistics of the uploaded data</p>
        <div className='d-flex justify-content-start d-lg-none mt-4'>
          <Link to='/login'>
            <Button variant='dark'>Authenticate</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
