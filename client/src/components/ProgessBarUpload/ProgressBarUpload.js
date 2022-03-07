import { ProgressBar, Button } from 'react-bootstrap';
import { useAppContext } from '../../context/appContext';
import './progress-bar-upload.scss';

const ProgressBarUpload = () => {
  const { showProgressBar, progressUpload, cancelUpload } = useAppContext();
  return (
    <>
      {showProgressBar && (
        <div className='progress-box mx-auto d-flex flex-column justify-content-center'>
          <div className='progress-text-btn-box'>
            <p className='mb-0 align-self-center fst-italic'>
              {progressUpload < 100 && 'Upload file in progress...'}
              {progressUpload === 100 && 'Upload completed'}
            </p>
            {progressUpload < 100 && (
              <Button variant='outline-primary' onClick={() => cancelUpload()}>
                Cancel
              </Button>
            )}
          </div>
          <ProgressBar
            now={progressUpload}
            label={`${progressUpload}%`}
            animated
          />
        </div>
      )}
    </>
  );
};

export default ProgressBarUpload;
