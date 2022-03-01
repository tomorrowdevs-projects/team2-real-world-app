import { Form, Button, ProgressBar } from 'react-bootstrap';
import './upload-file-section.scss';

const UploadFileSection = ({
  progress,
  handleSubmit,
  handleInputFile,
  cancelUpload,
  isFileUploaded,
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
              accept='.csv'
              disabled={progress}
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
            <Button variant='primary' type='submit' disabled={progress}>
              Upload
            </Button>
            {progress && progress < 100 && (
              <Button variant='outline-primary' onClick={() => cancelUpload()}>
                Cancel
              </Button>
            )}
            {isFileUploaded && (
              <h2 className='pt-2 fst-italic'>There is data in memory.</h2>
            )}
          </div>
        </Form>
      </section>
    </main>
  );
};

export default UploadFileSection;
