import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import UploadFileSection from './UploadFile';

const UploadFile = () => {
  const {
    //Reducer
    dispatch,
    //Upload file
    isDataAvailable,
    alreadyRequestedUpload,
    fileToUpload,
    responseUpload,
    isLoadingUpload,
    errorUpload,
    progressUpload,
    //URL
    urlFileUpload,
    urlCurrentFileUpload,
  } = useAppContext();

  //Set file to upload
  useEffect(() => {
    fileToUpload
      ? console.log('File to upload: ', fileToUpload.get('file').name)
      : console.log('File to upload: ', fileToUpload);
  }, [fileToUpload]);

  useEffect(() => {
    fileToUpload &&
      !fileToUpload.get('file').name &&
      dispatch({ type: 'SET_FILE_TO_UPLOAD', payload: null });
  }, [dispatch, fileToUpload]);

  const handleInputFile = event => {
    const fileData = new FormData();
    console.log(fileData.get('file'));
    fileData.append('file', event.target.files[0]);
    dispatch({ type: 'SET_FILE_TO_UPLOAD', payload: fileData });
  };

  //Set Progress bar
  useEffect(() => {
    dispatch({ type: 'SET_PROGRESS_BAR', payload: progressUpload });
  }, [dispatch, progressUpload]);

  //Set response of upload file
  useEffect(() => {
    dispatch({ type: 'SET_ALREADY_REQUESTED_UPLOAD', payload: false });
    dispatch({ type: 'SET_CURRENT_FILE_UPLOAD_URL', payload: '' });
    if (isLoadingUpload) return;
    if (errorUpload) {
      dispatch({ type: 'SET_CURRENT_FILE_UPLOAD_URL', payload: '' });
      // dispatch({ type: 'SET_FILE_TO_UPLOAD', payload: null });
    }
    if (responseUpload) {
      dispatch({ type: 'SET_RESPONSE_LAST_UPLOAD', payload: responseUpload });
      dispatch({ type: 'SET_DATA_AVAILABLE', payload: true });
      dispatch({ type: 'SET_CURRENT_FILE_UPLOAD_URL', payload: '' });
    }
  }, [
    dispatch,
    responseUpload,
    isLoadingUpload,
    errorUpload,
    alreadyRequestedUpload,
  ]);

  //Submit upload file
  useEffect(() => {
    console.log('Current url upload: ', urlCurrentFileUpload);
  }, [urlCurrentFileUpload]);

  const handleSubmit = event => {
    event.preventDefault();
    if (fileToUpload) {
      dispatch({
        type: 'SET_CURRENT_FILE_UPLOAD_URL',
        payload: urlFileUpload,
      });
    } else {
      dispatch({ type: 'SET_ALREADY_REQUESTED_UPLOAD', payload: true });
    }
  };

  return (
    <UploadFileSection
      isLoadingUpload={isLoadingUpload}
      handleInputFile={handleInputFile}
      handleSubmit={handleSubmit}
      progressUpload={progressUpload}
      isDataAvailable={isDataAvailable}
    />
  );
};

export default UploadFile;
