import * as firebase from 'firebase';

const settings = {timestampInSnapshots: true};

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB10gY0JcPVkBjMytCigJwu7OEsKrSqEq8",
    authDomain: "product-catalogue-8ed81.firebaseapp.com",
    databaseURL: "https://product-catalogue-8ed81.firebaseio.com",
    projectId: "product-catalogue-8ed81",
    storageBucket: "product-catalogue-8ed81.appspot.com",
    messagingSenderId: "845555948031",
    appId: "1:845555948031:web:e6343dcf7c61c4ec28afca",
    measurementId: "G-WS6TG91Z1S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.firestone().settings(settings);

  export default firebase;