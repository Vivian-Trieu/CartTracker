// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDj0QJk8Ptz0N_WjHg76iFhY3f2fBmStcM",
    authDomain: "app-to-test-multiple-users.firebaseapp.com",
    databaseURL: "https://app-to-test-multiple-users-default-rtdb.firebaseio.com",
    projectId: "app-to-test-multiple-users",
    storageBucket: "app-to-test-multiple-users.appspot.com",
    messagingSenderId: "342422003892",
    appId: "1:342422003892:web:77cae1a2d537be989737e1"
};

firebase.initializeApp(firebaseConfig);

function togglePingStatus(hole) {
    // Get the current ping status from the Firebase database
    firebase.database().ref('JTlist/hole' + hole + '/ping').once('value').then(function (snapshot) {
        var currentStatus = snapshot.val();

        // Update the ping status only if it is currently true
        if (currentStatus === true) {
            firebase.database().ref('JTlist/hole' + hole).update({
                ping: false
            });
        }
    });
}

// Listen for changes in the ping value and update button color accordingly
function listenForPingChanges(hole, button) {
    firebase.database().ref('JTlist/hole' + hole + '/ping').on('value', function (snapshot) {
        var pingValue = snapshot.val();

        // Check if the ping value changed from true to false
        if (pingValue === false) {
            latestButtonElement.textContent = button.textContent;
        }

        // Update the button color based on the ping status
        if (pingValue === true) {
            button.classList.add('pinged');
        } else {
            button.classList.remove('pinged');
        }
    });
}

// Shows what button is clicked to be displayed in the h3 tag
const latestButtonElement = document.getElementById('latestButton');
const buttons = document.getElementsByClassName('holeButton');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
        const buttonText = event.target.textContent;
        
        // Only update the text content if the button has the "pinged" class
        if (event.target.classList.contains('pinged')) {
            latestButtonElement.textContent = buttonText;
        }
    }); 
}

// Call listenForPingChanges for each hole
document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.getElementsByClassName('holeButton');
    for (var i = 0; i < buttons.length; i++) {
        var hole = i + 1;
        listenForPingChanges(hole, buttons[i]);
    }
});