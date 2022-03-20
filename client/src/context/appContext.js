import React, { useContext, useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import reducer from './reducer';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { appFirebase } from '../services/auth/firebase-config';
import Loading from '../components/Loading/Loading';
import { useUploadFile } from '../hooks/useUploadFile';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchMetrics } from '../hooks/useFetchMetrics';

const AppContext = React.createContext();

const defaultState = {
  //User
  currentUser: false,
  //Upload file
  isDataAvailable: false,
  alreadyRequestedUpload: false,
  fileToUpload: null,
  showProgressBar: false,
  progressBarValue: null,
  responseLastUpload: null,
  //Product list
  productList: null,
  //Queries
  alreadyRequested: false,
  queryParam: '',
  metricsResult: null,
  responseReady: false,
  //Loader
  isLoading: true,
  //Alerts
  alert: {
    show: false,
    message: '',
    variant: '',
    dismissibile: true,
    animation: '',
  },
  alertSearch: {
    show: false,
    message: '',
    variant: '',
    dismissibile: true,
    animation: '',
  },
  //URL
  urlFileUpload: '//localhost:8080/upload',
  //urlGetProducts: 'http://localhost:8080/products',
  urlGetProducts: `https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/products`,
  //urlGetProductMetrics: 'http://localhost:8080/product_metrics',
  urlGetProductMetrics:
    'https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/product_metrics',
  //urlGetCustomerCount: 'http://localhost:8080/customers_count',
  urlGetCustomerCount:
    'https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/customer_metrics',
  //urlGetOrderAvg: 'http://localhost:8080/orders_avg',
  urlGetOrderAvg:
    'https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/average_metrics',
  urlCurrentFileUpload: '',
  urlCurrentProducts: '',
  urlCurrentMetrics: '',
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const navigate = useNavigate();

  //HTTP REQUESTS
  const {
    responseUpload,
    isLoadingUpload,
    errorUpload,
    progressUpload,
    cancelUpload,
  } = useUploadFile(state.urlCurrentFileUpload, state.fileToUpload);

  const { dataFetchProducts, isFetchLoadingProducts, errorFetchProducts } =
    useFetchProducts(state.urlCurrentProducts);

  const { dataFetchMetrics, isFetchLoadingMetrics, errorFetchMetrics } =
    useFetchMetrics(state.urlCurrentMetrics);

  //Generic dispatch
  const setDispatch = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  //Alert handler functions
  const handleAlert = useCallback(
    (...value) => {
      dispatch({ type: 'HANDLE_ALERT', payload: value });
    },
    [dispatch]
  );

  const handleAlertSearch = (...value) => {
    dispatch({ type: 'HANDLE_ALERT_SEARCH', payload: value });
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleAlert(false), 3000);
    clearInterval(timeout);
    state.alert.show && setTimeout(() => handleAlert(false), 3000);
  }, [state.alert.show, handleAlert]);

  //Check data available in memory
  useEffect(() => {
    console.log('Is data available in memory?', state.isDataAvailable);
    !state.currentUser && setDispatch('SET_DATA_AVAILABLE', false);
  }, [state.isDataAvailable, state.currentUser]);

  //Set Progress bar
  useEffect(() => {
    if (errorUpload) {
      dispatch({
        type: 'SHOW_PROGRESS_BAR',
        payload: false,
      });
    } else if (!errorUpload && progressUpload > 0 && progressUpload < 100) {
      handleAlert(false);
      dispatch({ type: 'SHOW_PROGRESS_BAR', payload: true });
    } else if (!errorUpload && progressUpload === 100) {
      setTimeout(
        () => dispatch({ type: 'SHOW_PROGRESS_BAR', payload: false }),
        4000
      );
    }
  }, [dispatch, progressUpload, errorUpload, handleAlert]);

  //Handle alert upload page
  useEffect(() => {
    if (state.alreadyRequestedUpload && !state.fileToUpload) {
      dispatch({
        type: 'HANDLE_ALERT',
        payload: [true, 'Please, choose a file first.', 'danger', false],
      });
    } else if (errorUpload && errorUpload === 'Upload cancelled.') {
      dispatch({
        type: 'HANDLE_ALERT',
        payload: [true, errorUpload, 'danger', false],
      });
    } else if (errorUpload && errorUpload !== 'Upload cancelled.') {
      dispatch({
        type: 'HANDLE_ALERT',
        payload: [true, `Sorry... ${errorUpload}.`, 'danger', false],
      });
    }
  }, [dispatch, state.alreadyRequestedUpload, state.fileToUpload, errorUpload]);

  //Auth
  const auth = getAuth(appFirebase);

  const signInWithProvider = authProvider => {
    handleAlert(false);
    const provider = new authProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = authProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setDispatch('UPDATE_USER_DATA', {
          accessToken: token,
          userName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
        navigate('/');
      })
      .catch(error => {
        handleAlert(
          true,
          'Sorry, login problems, please try again.',
          'danger',
          false
        );
        console.log('Login error: ', error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(
        setDispatch('SET_LOADING', true),
        setDispatch('UPDATE_USER_DATA', null),
        navigate('/')
      )
      .catch(error => {
        handleAlert(
          true,
          'Sorry, logout problems, please try again.',
          'danger',
          false
        );
        console.log('Logout error: ', error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      if (userData) {
        setDispatch('UPDATE_USER_DATA', {
          accessToken: userData.accessToken,
          userName: userData.displayName,
          email: userData.email,
          photo: userData.photoURL,
        });
      }
      setDispatch('SET_LOADING', false);
    });
  }, [auth]);

  useEffect(() => {
    console.log('Current user: ', state.currentUser);
  }, [state.currentUser]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        signInWithProvider,
        GoogleAuthProvider,
        logout,
        setDispatch,
        handleAlert,
        handleAlertSearch,
        responseUpload,
        isLoadingUpload,
        errorUpload,
        progressUpload,
        cancelUpload,
        dataFetchProducts,
        isFetchLoadingProducts,
        errorFetchProducts,
        dataFetchMetrics,
        isFetchLoadingMetrics,
        errorFetchMetrics,
      }}
    >
      {state.isLoading ? <Loading /> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
