// Initialize Firebase
//  var config = {
//    apiKey: "AIzaSyB_6B4i_JJe8cxhXZv8vIBZgwRoRK_FObA",
//    authDomain: "jchat-18544.firebaseapp.com",
//    databaseURL: "https://jchat-18544.firebaseio.com/",
//    storageBucket: "jchat-18544.appspot.com",
//  };
// 
//var firebase = require("firebase");
  var config = {
    apiKey: "AIzaSyB_6B4i_JJe8cxhXZv8vIBZgwRoRK_FObA",
    authDomain: "jchat-18544.firebaseapp.com",
    databaseURL: "https://jchat-18544.firebaseio.com",
    storageBucket: "jchat-18544.appspot.com",
  };
var app = firebase.initializeApp(config);
//-----------auth signIn
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
//I don't understand what is going wrong with firebase.database
var database = firebase.database();
var messageClass = function () {
    var postMessage = function (event) {
        //to keep prevent a DOM reload of js on refresh
        event.preventDefault();
        //grab user input message
        var message = $('#message').val(); 
        var messageReference = database.ref('messages');

        $('#message').val('');
        //clear message section to aknowledge reciept
        //save data to the database using the set method
        messageReference.push({
            message: message,
            user: jApp.username
        });
    };
};
var getMessages = function (event) {
    var allMessages = [];
    var $messageBoard = $('#results');
    // use ref to app database to listen for changes in messages data
    database.ref('messages').on('value', function (results) {
        $messageBoard.html('');
        allMessages = [];
        var messages = results.val();
        for (var item in messages) {
            var msg = messages[item].message;
            var user = messages[item].user;
            $messageList = $('<li></li>');
            $messageList.attr('data-id', item);
            $user = $('<div class="user">').html(user);
            $messageList.html(msg);
            $messageList.append($user);
            $messageList.append($deleteElement);
            $messageList.append($upVoteElement);
            $messageList.append($downVoteElement);
            $messageList.append('<div class="curvotes pull-right">' + votes + '</div>');
            allMessages.push($messageList);
        } for (var i in allMessages) {
            $messageBoard.append(allMessages[i]);
        }
        return {
            postMessage: postMessage,
            getMessages: getMessages,
            updateMessage: updateMessage
        };
    });
};
var jApp = {
    currentUser: {},
    username: '',
    isLoggedIn: function () {
        jApp.currentUser = auth.currentUser;
        if (jApp.currentUser !== null) {
            jApp.username = jApp.currentUser.displayName;
        }
        return jApp.currentUser !== null;
    },
    login: function () {
        if (!jApp.isLoggedIn()) {
            auth.signInWithPopup(provider).then(function (result) {

                jsApp.currentUser = result.user;
                jsApp.username = jApp.currentUser.displayName;
                $('#loginInfo').html(jsApp.username);
                $('#loggedIn').show();
                $('#btnLogin').hide();
                messageClass.getMessages();
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                $('#loginInfo').html(error.message);
            });
        }
    },
    logout: function () {
        auth.signOut().then(function () {
            jApp.currentUser = null;
            jApp.username = '';
            $('#loggedIn').hide();
            $('#btnLogin').show();
        }).catch( function (error) {
            $('#loginInfo').html(error.message);
            // An error happened.
        })
    }
};

$(document).ready(function () {
    if (jApp.isLoggedIn()) {
        $('#loginInfo').html(jApp, currentUser.google.displayName);
        $('#loggedIn').show();
        $('#btnLogin').hide();
        messageClass.getMessages();
    } else {
        $('#loggedIn').hide();
        $('#btnLogIn').show();
    }
    $('#btnLogin').on('click', jApp.login);
    $('#btnLogout').on('click', jApp.logout);
    $('#btUpdateMessage').on('click', messageClass.postMessage);
});




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


