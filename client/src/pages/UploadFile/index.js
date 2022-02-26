import { useState, useEffect, useRef } from 'react';
import axios, { CancelToken, isCancel } from 'axios';
import { useAppContext } from '../../context/appContext';
import UploadFileSection from './UploadFile';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { handleAlert, setDispatch, isFileUploaded } = useAppContext();

  //Cancel file upload
  const cancelFileUpload = useRef(null);
  let cancelToken;

  //Hide the progress bar at the end of the upload
  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 500);
  }, [progress, setProgress]);

  const handleInputFile = event => {
    setFile(event.target.files[0]);
    handleAlert(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!file) {
      handleAlert(true, 'Please, choose a file first.', 'danger');
      return;
    }
    const fileData = new FormData();
    fileData.append('file', file);
    handleAlert(false);

    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    const option = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
      //File upload interruption
      cancelToken: new CancelToken(
        cancel => (cancelFileUpload.current = cancel)
      ),
    };

    axios
      .post('//localhost:8080/upload', fileData, option)
      .then(response => {
        console.log('Response upload file: ', response);
        setDispatch('FILE_UPLOADED', true);
        handleAlert(true, `File was uploaded succesfully`, 'success', false);
      })
      .catch(error => {
        console.log(error.response);
        if (isCancel(error)) {
          console.log('Request cancelled successfully.');
          handleAlert(true, 'File upload is canceled', 'danger');
          return;
        }
        handleAlert(true, `Something went wrong, please try again`, 'danger');
      });
  };
  const cancelUpload = () => {
    if (cancelFileUpload.current) {
      cancelFileUpload.current('');
      setProgress(null);
    }
  };

  return (
    <UploadFileSection
      handleInputFile={handleInputFile}
      handleSubmit={handleSubmit}
      progress={progress}
      cancelUpload={cancelUpload}
      isFileUploaded={isFileUploaded}
    />
  );
};

export default UploadFile;
