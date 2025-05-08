// Firebase configuration and authentication setup
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// FirebaseUI config
const uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
            const user = authResult.user;
            document.getElementById('user-name').textContent = user.displayName || user.email;
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            return false;
        }
    }
};

// Handle authentication state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('user-name').textContent = user.displayName || user.email;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
    } else {
        // User is signed out
        document.getElementById('auth-container').style.display = 'flex';
        document.getElementById('app-container').style.display = 'none';
        // Initialize the FirebaseUI Widget
        ui.start('#firebaseui-auth-container', uiConfig);
    }
});

// Sign out function
window.signOut = () => {
    firebase.auth().signOut();
};
