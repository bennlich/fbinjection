console.log("Running injectedscript.js.");

var rootRef, intervalId;

// Create a button to interact with Firebase
var buttonTemplate = "<div class='fb_button'>0</div>";
var fbButton = $(buttonTemplate).click(function() {
    if (rootRef) rootRef.push(new Date().toUTCString());
});
fbButton = document.documentElement.appendChild(fbButton[0]);

// Get the Firebase script
// Note: If you try to fetch the Firebase script via HTTP GET here,
// the Firebase script will not be useable by this injectedscript.
// This is why we send a message to the background script to fetch
// and return the Firebase script.

if (typeof(Firebase) == 'undefined') {
    console.log("Requesting Firebase script.");
    chrome.extension.sendMessage({type: "requestFirebaseScript"}, function(res) {
        console.log(res);
        intervalId = setInterval(function() {
            console.log("Checking if Firebase script is loaded.");
            if (typeof(Firebase) == 'function') {
                initFb();
                clearInterval(intervalId);
            }
        }, 500);
    });
}

function initFb() {
    rootRef = new Firebase("https://fbinjection.firebaseio-demo.com/");
    rootRef.on("child_added", function(snap) {
        console.log(snap.val());
        $(fbButton).text(parseInt($(fbButton).text())+1);
    });
}