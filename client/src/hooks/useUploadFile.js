import { useEffect, useState, useRef } from 'react';
import axios, { CancelToken, isCancel } from 'axios';

export const useUploadFile = (url, file) => {
  const [responseUpload, setResponseUpload] = useState(null);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const [progressUpload, setProgressUpload] = useState(null);

  //Cancel file upload
  const cancelFileUpload = useRef(null);

  useEffect(() => {
    if (!url || !file) return;
    setProgressUpload(null);
    setIsLoadingUpload(true);
    console.log('Upload file started...');

    //Check if there are any previous pending requests
    let cancelToken;
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
        setProgressUpload(Math.round((100 * data.loaded) / data.total));
      },
      //File upload interruption
      cancelToken: new CancelToken(
        cancel => (cancelFileUpload.current = cancel)
      ),
    };

    axios
      .post(url, file, option)
      .then(response => {
        setResponseUpload(response);
        console.log('Response upload file: ', response);
        setIsLoadingUpload(false);
      })
      .catch(error => {
        setIsLoadingUpload(false);
        setErrorUpload(error);
        console.log('Error upload file: ', error.response);
        if (isCancel(error)) {
          console.log('Upload cancelled.');
          setErrorUpload('Upload cancelled.');
          return;
        }
      })
      .finally(() =>
        setTimeout(() => {
          setErrorUpload('');
        }, 1000)
      );
  }, [file, url]);

  const cancelUpload = () => {
    if (cancelFileUpload.current) {
      cancelFileUpload.current('');
      setProgressUpload(null);
    }
  };

  return {
    responseUpload,
    isLoadingUpload,
    errorUpload,
    progressUpload,
    cancelUpload,
  };
};
