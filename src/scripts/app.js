
  // Initialize Firebase
  var Firebase = require("firebase");
var config = {
    apiKey: "AIzaSyB_6B4i_JJe8cxhXZv8vIBZgwRoRK_FObA",
    authDomain: "jchat-18544.firebaseapp.com",
    databaseURL: "https://jchat-18544.firebaseio.com",
    storageBucket: "jchat-18544.appspot.com",
};
  firebase.initializeApp(config);

var lblCurrentMessage = document.getElementById('lblCurrentMessage'),
    txtNewMessage = document.getElementById('txtNewMessage'),
    btUpdateMessage = document.getElementById('btUpdateMessage'),
    login = document.getElementById('login'),
    rootRef = firebase.database(),
    currentMessageRef = rootRef.ref('currentMessage');

btUpdateMessage.addEventListener('click', function() {
    currentMessageRef.set(txtNewMessage.value);
    txtNewMessage.value='';
    
    //prompt user to login and then provoke the snippet below
  login.addEventListener('click', function() { firebase.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData); } });
});


