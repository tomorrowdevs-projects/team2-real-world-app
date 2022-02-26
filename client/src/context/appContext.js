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

const AppContext = React.createContext();

const defaultState = {
  //User
  currentUser: null,
  //Upload file
  isFileUploaded: false,
  //Product list
  showProductList: false,
  statusProductListReq: 'idle',
  productList: [],
  //Queries
  queryParam: '',
  queryParamReady: false,
  response: {},
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
  //Url
  localUrlGetProducts: 'http://localhost:8080/products',
  urlGetProducts: `https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/products`,
  localUrlProduct_metrics: 'http://localhost:8080/product_metrics',
  urlGetProduct_Metrics:
    'https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/product_metrics',
  urlGetCustomers:
    'https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/customers',
  urlGetAverage:
    'https://61ebc1bd7ec58900177cdd56.mockapi.io/domserver/average',
  urlError: 'http://httpstat.us/404',
  urlCurrent: '',
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const navigate = useNavigate();

  const { dataFetch, isFetchLoading, errorFetch } = useFetch(state.urlCurrent);

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
      }}
    >
      {state.isLoading ? <Loading /> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
