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

  //Auth
  const auth = getAuth(appFirebase);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };
  const handleAlert = (...value) => {
    dispatch({ type: 'HANDLE_ALERT', payload: value });
  };

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
