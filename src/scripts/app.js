
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
var auth = firebase.auth();
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();

$(document).ready(function() { 
    if (jApp.isLoggedIn()) {
        $('#loginInfo').html(jApp,currentUser.google.displayName);
        $('#loggedIn').show();
        $('#btnLogin').hide();
        messageClass.getMessages();
    } else {
        $('#loggedIn').hide();
        $('#btnLogIn').show();
    }
    $('#btnLogin').on('click',jApp.login);
    $('#btnLogout').on('click',jApp.logout);
    $('#btUpdateMessage').on('click',messageClass.postMessage);
})
var jApp = {
    currentUser : {},
    username: '',
    isLoggedIn: function () {
        jApp.currentUser = auth.currentUser;
        if (jApp.currentUser !== null) {
            jApp.username = jApp.currentUser.displayName;
        }
        return jApp.currentUser !== null;
    }, 
    login: function() {
        if (!jApp.isLoggedIn()) {
            auth.signInWithPopup (provider).then(function(result) {

                login.addEventListener('click', function() {
                    //a sign in popup will be generated
                    //I will use popup, redirect is preffered in mobile though
                    firebase.auth().signInWithPopup(provider).then(function(result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        user = result.user;
                        username = jsApp.currentUser.displayName;
                        $('#loginInfo').html(username);
                        $('#loggedIn').show();
                        $('#btnLogin').hide();
                        messageClass.getMessages();
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        $('#loginInfo').html(error.message);
                    });
                } else {
                $('#loginInfo').html(jApp.username);
                $('#loginInfo').html(jApp.username);                   
                $('#loggedIn').show();                   
                $('#btnLogin').hide(); 
                messageClass.getMessages();
            },
            logout: function(){
                auth.signOut().then(function () {
                    jApp.currentUser = null;
                    jApp.username = '';
                    $('#loggedIn').hide();
                    $('#btnLogin').show();
                }, function(error) {
                    $('#loginInfo').html(error.message);
                    // An error happened.
                });
                var messageClass = (function() {
                    var postMessage = function(event) {
                        //to keep prevent a DOM reload of js on refresh
                        event.preventDefault()
                        //grab user input message
                        var message = $('#message').val();
                        //a section for messages in my database
                        $('#message').val('');
                        //clear message section to aknowledge reciept
                        var messageReference.push({
                            message: message,
                            user:jApp.username
                        })
                    }};
                    var getMessages = function(event) {
                        var allMessages = [];
                        var $messageBoard = $('#results');
                        // use ref to app database to listen for changes in messages data
                        database.ref('messages').on('value', function (results) {
                            $messageBoard.html('');
                            allMessages= [];
                            var messages = results.val();
                            for (var item in messages) {
                                var msg = messages[item].message;
                                var user = messages[item].user;
                                $messageList = $('<li></li>');
                                $messageList.attr('data-id',item);
                                $user = $('<div class="user">').html(user);
                            } 
                             $messageList.html(msg);
                             $messageList.append($user);
                             $messageList.append($deleteElement);
                             $messageList.append($upVoteElement);
                             $messageList.append($downVoteElement);
                             $messageList.append('<div class="curvotes pull-right">' + votes + '</div>')
                             allMessages.push($messageList);
                        }  for  (var i in allMessages) {
                                $messageBoard.append(allMessages[i]);
                            }
                        })
                    return {
                                  postMessage:postMessage,
                                  getMessages: getMessages,
                                  update<essage: updateMessage
                                  }
                    };
                
                                  
                                  
                                  
                                  
//                var lblCurrentMessage = document.getElementById('lblCurrentMessage'),
//                    txtNewMessage = document.getElementById('txtNewMessage'),
//                    btUpdateMessage = document.getElementById('btUpdateMessage'),
//                    login = document.getElementById('login'),
//                    rootRef = firebase.database(),
//                    currentMessageRef = rootRef.ref('currentMessage');
//
//                btUpdateMessage.addEventListener('click', function() {
//                    currentMessageRef.set(txtNewMessage.value);
//                    txtNewMessage.value=''; });


