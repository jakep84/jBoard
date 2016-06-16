var config = {
    apiKey: "AIzaSyAb8La8NazINqO7iwODX7iPzW7qsPlwl-g",
    authDomain: "project-8255575667212461091.firebaseapp.com",
    databaseURL: "https://project-8255575667212461091.firebaseio.com",
    storageBucket: "project-8255575667212461091.appspot.com",
  };

var app = firebase.initializeApp(config);
//-----------auth signIn
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var messageClass =  {
        postMessage : function (event) {
        //to keep prevent a DOM reload of js on refresh
        event.preventDefault();
        //grab user input message
        var message = document.getElementById("txtNewMessage").val(); 
        var messageReference = database.ref('messages');

        document.getElementById("txtNewMessage").value(''); 
        //clear message section to aknowledge reciept
        //save data to the database using the set method
        messageReference.push({
            message: message,
            user: jApp.username
        });
    }
}
var getMessages = function (event) {
    var allMessages = [];
    var $messageBoard = $('well');
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

            // this should be where the user name is appended to end of the message. Pretty sure

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

            //---not allowing me to literaly sign in (even after I log out)
            auth.signInWithPopup(provider).then(function (result) {

                jApp.currentUser = result.user;
                jApp.username = jApp.currentUser.displayName;
                $('#loginInfo').html(jApp.username);
                $('#loggedIn').show();
                $('#btnLogin').hide();
   //             messageClass.getMessages();
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

            //worry with toggilng show and hide later
            //            $('#btnLogin').hide();
            //            $('#btnLogout').show();
        }).catch( function (error) {
            $('#loginInfo').html(error.message);
            // An error happened.
        })
    }
};





$(document).ready(function () {
    if (jApp.isLoggedIn()) {
        $('p').html(jApp, currentUser.google.displayName);
        //worry with toggilng show and hide later
//                $('#btnLogin').show();
//                $('#btnLogout').show();
        messageClass.getMessages();
        //    } else {
        //        $('#btnLogin').show();
        //        $('#btnLogout').show();
    }
    $('#btnLogin').on('click', jApp.login);
    $('#btnLogout').on('click', jApp.logout);
    $('#btUpdateMessage').on('click', messageClass.postMessage);
});


//
//// --------- A simplified login button toggle
//$(document).ready(function () {
//    if (jApp.isLoggedIn()) {
//        $('#loginInfo').html(jApp, currentUser.google.displayName);
//        $('#btnLogin').hide();
//        $('#btnLogout').show();
//        messageClass.getMessages();
//    } else {
//        $('#btnLogin').show();
//        $('#btnLogout').hide();
//    }
//    $('#btnLogin').on('click', jApp.login);
//    $('#btnLogout').on('click', jApp.logout);
//    $('#btUpdateMessage').on('click', messageClass.postMessage);
//});
//