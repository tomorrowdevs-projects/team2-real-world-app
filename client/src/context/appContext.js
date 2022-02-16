import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { appFirebase } from '../services/auth/firebase-config';

const AppContext = React.createContext();

const defaultState = {
  currentUser: null,
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

  //Generic dispatch
  const setDispatch = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };
  //Auth
  const auth = getAuth(appFirebase);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      console.log('user:', userData);
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
    state.currentUser ? console.log('user logged in') : console.log('no user');
  }, [state.currentUser]);

  return (
    <AppContext.Provider
      value={{ ...state, signInWithGoogle, logout, handleAlert }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
