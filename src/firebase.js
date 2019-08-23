import firebase from "firebase"
var config = {
  apiKey: "AIzaSyBcBUpMP8kPEe1d04jVsmPxnQmk893WrME",
  authDomain: "complaint-manengment.firebaseapp.com",
  databaseURL: "https://complaint-manengment.firebaseio.com",
  projectId: "complaint-manengment",
  storageBucket: "complaint-manengment.appspot.com",
  messagingSenderId: "585912080033"
};
firebase.initializeApp(config);
var db = firebase.database()
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
var storage = firebase.storage().ref();
export { db, storage, firebase }