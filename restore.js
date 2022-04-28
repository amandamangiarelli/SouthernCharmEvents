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

// Listen if user is logged in or out
firebase.auth().onAuthStateChanged(firebaseUser => {
  // Redirect to index.html when the user logs out
  if (!firebaseUser)
    window.location.href = "index.html";

});

// Lists backups
function listBackups() {
  let xhr = new XMLHttpRequest();
  // Display response when ready
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let xmlBackups = new DOMParser().parseFromString(xhr.responseText, "text/xml");

        let backupTable = document.getElementById("backupTable");
        let backupHeader = document.createElement("tr");
        backupHeader.classList += "backupHeader";
        let backupNumber = document.createElement("th");
        backupNumber.innerHTML = "No.";
        let backupDateTime = document.createElement("th");
        backupDateTime.innerHTML = "Time Created";
        backupHeader.appendChild(backupNumber);
        backupHeader.appendChild(backupDateTime);
        backupTable.appendChild(backupHeader);

        for (let b of xmlBackups.getElementsByTagName("backup")) {

          let backupRow = document.createElement("tr");
          backupRow.classList += "backupRow";
          backupRow.id = b.getElementsByTagName("backupNumber")[0].innerHTML;
          let backupNumber = document.createElement("td");
          backupNumber.innerHTML = b.getElementsByTagName("backupNumber")[0].innerHTML;
          let backupDateTime = document.createElement("td");
          backupDateTime.innerHTML = b.getElementsByTagName("backupDateTime")[0].innerHTML;
          backupRow.appendChild(backupNumber);
          backupRow.appendChild(backupDateTime);
          backupRow.addEventListener('click', function () {restore(backupRow.id);});
          backupTable.appendChild(backupRow);
        }
      }
      else {
        console.log('Error Code: ' + xhr.status);
        console.log('Error Message: ' + xhr.statusText);
      }
    }
  }

  xhr.open('GET', 'listBackups.php');
  xhr.send();
}
listBackups();

// Handles restore
function restore(selection) {
  if (confirm("Are you sure you want to restore this backup?")) {
    let xhr2 = new XMLHttpRequest();

    // Display response when ready
    xhr2.onreadystatechange = () => {
      if (xhr2.readyState === 4) {
        if (xhr2.status === 200) {
          alert(xhr2.responseText);
          window.location.href = "calendar.html";
        }
        else {
          console.log('Error Code: ' + xhr2.status);
          console.log('Error Message: ' + xhr2.statusText);
        }
      }
    }
    
    xhr2.open('POST', 'restore.php?selection=' + selection);
    xhr2.send();
  }
}