<script>
  // Initialize Firebase
  var Firebase = require("firebase");
  var config = {
    apiKey: "AIzaSyB_6B4i_JJe8cxhXZv8vIBZgwRoRK_FObA",
    authDomain: "jchat-18544.firebaseapp.com",
    databaseURL: "https://jchat-18544.firebaseio.com",
    storageBucket: "jchat-18544.appspot.com",
  };
  firebase.initializeApp(config);
</script>
    <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
<script>
    var lblCurrentMessage = document.getElementById('lblCurrentMessage'),
        txtNewMessage = document.getElementById('txtNewMessage'),
        btUpdateMessage = document.getElementById('btUpdateMessage');
        rootRef = new Firebase('https://jchat-18544.firebaseapp.com/'),
        currentMessageRef = rootRef.child('currentMessage');

            btUpdateMessage.addEventListener('click', function() {
              currentMessageRef.set(txtNewMessage.value);
                txtNewMessage.value='';
            });
</script>