//Firebase config settings
const config = {
  apiKey: "AIzaSyAj35S-F-357emo8cqpS6-SE_G9h00gxgg",
  authDomain: "southerncharmevents-3487b.firebaseapp.com",
  databaseURL: "https://southerncharmevents-3487b-default-rtdb.firebaseio.com/",
  projectId: "southerncharmevents-3487b",
  storageBucket: "southerncharmevents-3487b.appspot.com",
  messagingSenderId: "916918657893",
  appId: "1:916918657893:web:e982e498ef9c9911c4b78c"
};

// setup/initilize databases
firebase.initializeApp(config);
let database = firebase.database();
let usersRef = database.ref('users');

// Listen to when a user is logged in or out
firebase.auth().onAuthStateChanged(firebaseUser => {
  // Redirect to index.html when the user logs out
  if (!firebaseUser)
    window.location.href = "index.html";

});