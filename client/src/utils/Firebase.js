import firebase from 'firebase'
// import keys from 'keys'

const config = {
  apiKey: "AIzaSyCU3sCDgFVgH4thtwYdKgzXF8uR-PcCcsY",
  authDomain: "killheim.firebaseapp.com",
  databaseURL: "https://killheim.firebaseio.com",
  projectId: "killheim",
  storageBucket: "killheim.appspot.com",
  messagingSenderId: "165725022995"
};
firebase.initializeApp(config);
  
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;