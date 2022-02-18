import { Spinner } from 'react-bootstrap';
import './loading.scss';
import Layout from '../Layout';

const Loading = () => {
  return (
    <Layout dNone='d-none'>
      <Spinner animation='border' className='align-items-center' />
    </Layout>
  );
};

export default Loading;
