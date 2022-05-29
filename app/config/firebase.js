import firebase from '@firebase/app';
import '@firebase/auth'
require("firebase/firestore")


var config = {
    apiKey: "AIzaSyAYnkQNoZabfHpyl1rY3iC2SdivPQUtZ0Q",
    authDomain: "nextup-ccc80.firebaseapp.com",
    projectId: "nextup-ccc80",
    storageBucket: "nextup-ccc80.appspot.com",
    messagingSenderId: "436345431576",
    appId: "1:436345431576:web:3fba9cfd0e6b016227456d",
    measurementId: "G-M27H8T5JW3"
};
firebase.initializeApp(config);

export default firebase