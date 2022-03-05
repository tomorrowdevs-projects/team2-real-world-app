import { ProgressBar, Button } from 'react-bootstrap';
import { useAppContext } from '../../context/appContext';
import './progress-bar-upload.scss';

const ProgressBarUpload = () => {
  const { progressBarValue, cancelUpload } = useAppContext();
  const show = true;
  return (
    <div className='progress-box mx-auto d-flex flex-column justify-content-center'>
      {show && (
        <>
          <div className='progress-text-btn-box'>
            <p className='mb-0 align-self-center fst-italic'>
              Upload file in progress...
            </p>
            <Button variant='outline-primary' onClick={() => cancelUpload()}>
              Cancel
            </Button>
          </div>
          <ProgressBar now={progressBarValue} label={`${progressBarValue}%`} />
        </>
      )}
    </div>
  );
};

export default ProgressBarUpload;
