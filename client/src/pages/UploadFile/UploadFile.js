import { Form, Button, ProgressBar } from 'react-bootstrap';
import './upload-file-section.scss';

const UploadFileSection = ({
  progress,
  handleSubmit,
  handleInputFile,
  cancelUpload,
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
              // accept='.csv'
            />
          </Form.Group>
          <div
            style={{
              height: '2rem',
            }}
          >
            <div className='container-progress d-flex flex-column justify-content-center'>
              {progress && (
                <ProgressBar now={progress} label={`${progress}%`} animated />
              )}
            </div>
          </div>
          <div className='button-box'>
            <Button variant='primary' type='submit'>
              Upload
            </Button>
            {progress && progress < 100 && (
              <Button variant='outline-primary' onClick={() => cancelUpload()}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </section>
    </main>
  );
};

export default UploadFileSection;
