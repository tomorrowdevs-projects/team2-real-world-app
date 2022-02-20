import React, { useContext, useReducer, useEffect } from 'react';
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

const AppContext = React.createContext();

const defaultState = {
  currentUser: null,
  isFileUploaded: false,
  isLoading: true,
  alert: {
    show: false,
    message: '',
    variant: '',
    dismissibile: true,
    animation: '',
  },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const navigate = useNavigate();

  //Generic dispatch
  const setDispatch = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  //Alerts
  const handleAlert = (...value) => {
    dispatch({ type: 'HANDLE_ALERT', payload: value });
  };

  useEffect(() => {
    state.alert.show && setTimeout(() => handleAlert(false), 3000);
  }, [state.alert.show]);

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
      console.log(userData);
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
    console.log(state.currentUser);
  }, [state.currentUser]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        signInWithProvider,
        GoogleAuthProvider,
        logout,
        setDispatch,
        handleAlert,
      }}
    >
      {state.isLoading ? <Loading /> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
