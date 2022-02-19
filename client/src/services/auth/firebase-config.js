import { initializeApp } from 'firebase/app';

// App's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCpShvH3vZu4wJpmOrkGiMNvO9sxCI7BGc',
  authDomain: 'real-world-app-team-2.firebaseapp.com',
  projectId: 'real-world-app-team-2',
  storageBucket: 'real-world-app-team-2.appspot.com',
  messagingSenderId: '196085551827',
  appId: '1:196085551827:web:1af780886cef5bd6b4fa26',
  measurementId: 'G-6MRTVJ75ZW',
};

// Initialize app Firebase
export const appFirebase = initializeApp(firebaseConfig);
