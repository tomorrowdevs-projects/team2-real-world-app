import { Form, Button } from 'react-bootstrap';
import './upload-file-section.scss';

const UploadFileSection = ({
  isLoadingUpload,
  handleInputFile,
  handleSubmit,
  isDataAvailable,
}) => {
  return (
    <main>
      <section className='upload-file-section'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formFileLg'>
            <Form.Label className='mt-2'>
              <h1>Upload your file .csv</h1>
            </Form.Label>
            <Form.Control
              type='file'
              size='lg'
              onChange={handleInputFile}
              //accept='.csv'
              disabled={isLoadingUpload}
            />
          </Form.Group>
          <div
            style={{
              height: '2rem',
            }}
          ></div>
          <div className='button-box'>
            <Button variant='primary' type='submit' disabled={isLoadingUpload}>
              Upload
            </Button>
            <h2 className='ms-3 mb-0 fst-italic text-center'>
              {isDataAvailable
                ? 'Data available in memory'
                : 'No data available in memory'}
            </h2>
          </div>
        </Form>
      </section>
    </main>
  );
};

export default UploadFileSection;
