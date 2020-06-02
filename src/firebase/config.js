import firebase from 'firebase';
export {
  auth,
  db
}

var firebaseConfig = {
  apiKey: "AIzaSyDndRTUETb0xJLOVQs0QwQw2AhgtSjx4Rg",
  authDomain: "todo-goit.firebaseapp.com",
  databaseURL: "https://todo-goit.firebaseio.com",
  projectId: "todo-goit",
  storageBucket: "todo-goit.appspot.com",
  messagingSenderId: "876279217024",
  appId: "1:876279217024:web:f2639444b5a8fa0f5c9f65"
};

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const db = firebase.firestore();
