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
const passwordReset = document.getElementById('resetPasswordButton');

// Send email to reset user's password
passwordReset.addEventListener('click', e => {
    const email = userEmail.value;
    const auth = firebase.auth();
    const promise = auth.sendPasswordResetEmail(email);
    promise.then(() => {
        alert("Please check your e-mail to reset your password.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
        alert(errorCode + ": " + errorMessage);
      });
  });

// Redirect to calendar if logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      window.location.href = "calendar.html";
    }
  });