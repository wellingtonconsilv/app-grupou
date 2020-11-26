import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCFhQZsLG3AurHDpevOyLfcGdzxs-Q7d80",
  authDomain: "grupouav2.firebaseapp.com",
  databaseURL: "https://grupouav2.firebaseio.com",
  projectId: "grupouav2",
  storageBucket: "grupouav2.appspot.com",
  messagingSenderId: "1076105031974",
  appId: "1:1076105031974:web:d53da2d681ce31be86d1e7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
