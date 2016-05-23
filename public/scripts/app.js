
  // Initialize Firebase
//var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyB_6B4i_JJe8cxhXZv8vIBZgwRoRK_FObA",
    authDomain: "jchat-18544.firebaseapp.com",
    databaseURL: "https://jchat-18544.firebaseio.com",
    storageBucket: "jchat-18544.appspot.com",
};
  firebase.initializeApp(config);
//-----------auth signIn
// google provider object
var provider = new firebase.auth.GoogleAuthProvider();
//call scope with: provider.addScope('https://www.googleapis.com/auth/plus.login');
//login button click event "when you click the login button"
login.addEventListener('click', function() {
//a sign in popup will be generated
    //I will use popup, redirect is preffered in mobile though
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
                                           })
//-----------auth signOut
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
var lblCurrentMessage = document.getElementById('lblCurrentMessage'),
    txtNewMessage = document.getElementById('txtNewMessage'),
    btUpdateMessage = document.getElementById('btUpdateMessage'),
    login = document.getElementById('login'),
    rootRef = firebase.database(),
    currentMessageRef = rootRef.ref('currentMessage');

btUpdateMessage.addEventListener('click', function() {
    currentMessageRef.set(txtNewMessage.value);
    txtNewMessage.value=''; });
    
    //prompt user to login and then provoke the snippet below
  login.addEventListener('click', function() { firebase.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData); } })
});


