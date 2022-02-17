import React, { useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router';
import reducer from './reducer';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { appFirebase } from '../services/auth/firebase-config';
import Loading from '../components/Loading/Loading';

const AppContext = React.createContext();

const defaultState = {
  currentUser: null,
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

  //Auth
  const auth = getAuth(appFirebase);

  const signInWithProvider = authProvider => {
    handleAlert(false);
    const provider = new authProvider();
    signInWithRedirect(auth, provider)
      .then(navigate('/'))
      .catch(error =>
        handleAlert(
          true,
          `Sorry, some login problems... ${error.message}`,
          'danger',
          false
        )
      );
  };

  const logout = () => {
    signOut(auth)
      .then(navigate('/'))
      .catch(error =>
        handleAlert(
          true,
          `Sorry, some logout problems... ${error.message}`,
          'danger',
          false
        )
      );
  };

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      if (userData) {
        setDispatch('UPDATE_USER_LOGGED', {
          accessToken: userData.accessToken,
          userName: userData.displayName,
          email: userData.email,
          photo: userData.photoURL,
        });
      } else {
        setDispatch('UPDATE_USER_LOGGED', null);
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
