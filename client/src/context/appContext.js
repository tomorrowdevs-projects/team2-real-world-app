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
import { useFetch } from '../hooks/useFetch';
import { useFetchMetrics } from '../hooks/useFetchMetrics';

const AppContext = React.createContext();

const defaultState = {
  //User
  currentUser: null,
  //Upload file
  isFileUploaded: false,
  //Product list
  showProductList: false,
  productList: null,
  //Queries
  alreadyRequested: false,
  queryParam: '',
  response: null,
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
  urlError: 'http://httpstat.us/404',
  urlCurrentProducts: '',
  urlCurrentMetrics: '',
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const navigate = useNavigate();

  const { dataFetch, isFetchLoading, errorFetch } = useFetch(state.urlCurrent);

  const { dataFetchMetrics, isFetchLoadingMetrics, errorFetchMetrics } =
    useFetchMetrics(state.urlCurrentMetrics);

  //Generic dispatch
  const setDispatch = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  //Alerts
  const handleAlert = useCallback(
    (...value) => {
      dispatch({ type: 'HANDLE_ALERT', payload: value });
    },
    [dispatch]
  );

  useEffect(() => {
    const timeout = setTimeout(() => handleAlert(false), 3000);
    clearInterval(timeout);
    state.alert.show && setTimeout(() => handleAlert(false), 3000);
  }, [state.alert.show, handleAlert]);

  const handleAlertSearch = (...value) => {
    dispatch({ type: 'HANDLE_ALERT_SEARCH', payload: value });
  };

  //File uploaded
  useEffect(() => {
    console.log('File uploaded?', state.isFileUploaded);
    !state.currentUser && setDispatch('FILE_UPLOADED', false);
  }, [state.isFileUploaded, state.currentUser]);

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
        dataFetch,
        isFetchLoading,
        errorFetch,
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
