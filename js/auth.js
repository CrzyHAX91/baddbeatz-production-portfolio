// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoGmmWoIpqPjGd2KgCCZeU8Xn4oCJnW30",
  authDomain: "baddbeatz-8a9b4.firebaseapp.com",
  projectId: "baddbeatz-8a9b4",
  storageBucket: "baddbeatz-8a9b4.firebasestorage.app",
  messagingSenderId: "609813125383",
  appId: "1:609813125383:web:933e8101b6cb4bdcfccda2",
  measurementId: "G-44NXM5BMEZ"
};

// Initialize Firebase
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const uiConfig = {
  signInOptions: [
    // List of OAuth providers supported
    'password',
    'google.com'
  ],
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      const user = authResult.user;
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('app-container').style.display = 'block';
      return false;
    },
    signInFailure: (error) => {
      console.error('Sign-in error:', error);
      alert('Authentication failed. Please try again.');
    }
  }
};

const ui = new firebaseui.auth.AuthUI(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
  } else {
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    ui.start('#firebaseui-auth-container', uiConfig);
  }
});

window.signOut = () => {
  signOut(auth);
};
