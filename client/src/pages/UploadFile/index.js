import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/appContext';
import UploadFileSection from './UploadFile';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { handleAlert } = useAppContext();

  useEffect(() => {
    progress === 100 && setTimeout(() => setProgress(null), 3000);
  }, [progress, setProgress]);

  const handleInputFile = event => {
    setFile(event.target.files[0]);
    handleAlert(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!file) {
      handleAlert(true, 'Please, choose a file first.', 'danger', true);
      return;
    }
    const fileData = new FormData();
    fileData.append('file', file);
    handleAlert(false);

    const option = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    };

    axios
      .post('//localhost:8000/upload', fileData, option)
      .then(response => {
        console.log('Success!', response, response.data);
        handleAlert(
          true,
          `File ${response.data.filename.slice(14)} loaded successfully`,
          'success',
          false
        );
      })
      .catch(error => {
        console.log('Sorry, an error occurred.', error);
        handleAlert(true, `Sorry... ${error}`, 'danger', true);
      });
  };
  return (
    <UploadFileSection
      handleInputFile={handleInputFile}
      handleSubmit={handleSubmit}
      progress={progress}
    />
  );
};

export default UploadFile;
