import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_4YGZu4C_kjYppErP5AWzlSUVuc57qXw",
    authDomain: "mit20blogs.firebaseapp.com",
    projectId: "mit20blogs",
    storageBucket: "mit20blogs.appspot.com",
    messagingSenderId: "69227796371",
    appId: "1:69227796371:web:9fd5b932cc019bf5a57a66"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { timestamp };
  export default firebaseApp.firestore();