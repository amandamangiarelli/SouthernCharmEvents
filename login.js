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

// setup/initilize db
firebase.initializeApp(config);
let database = firebase.database();
let usersRef = database.ref('users');

// Get Elements
let usersName;
const userEmail = document.getElementById('user_email');
const userPass = document.getElementById('user_pass');
const loginBtn = document.getElementById('loginButton');
const signUpBtn = document.getElementById('signUpButton');
const passwordReset = document.getElementById('passwordReset');

// Add Login Event
loginBtn.addEventListener('click', () => {
  // Get Email and Password
  const email = userEmail.value.trim();
  const password = userPass.value;
  const auth = firebase.auth();
  // Sign In
  const promise = auth.signInWithEmailAndPassword(email, password);
  // What happens if there is an error signing in
  // Pops up alert message and clears the fields
  promise.catch((e) => {
    alert(e.message);
    userEmail.value = '';
    userPass.value = '';
  });

});

// Add Sign Up Event
signUpBtn.addEventListener('click', e => {
  // Get Email and Password
  const email = userEmail.value;
  const password = userPass.value;
  const auth = firebase.auth();
  // Sign In
  const promise = auth.createUserWithEmailAndPassword(email, password);
  // What happens if there is an error signing up
  // Pops up alert message and clears the fields
  promise
    .catch((e) => {
      alert(e.message);
      userEmail.value = '';
      userPass.value = '';
    });
});

// Redirect user to calendar once logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    window.location.href = "calendar.html";
  }
});