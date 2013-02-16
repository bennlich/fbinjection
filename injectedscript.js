console.log("Running injectedscript.js.");

function onMsgReceived(msg) {
    console.log(msg);
    // increment the number displayed on the button
    $(fbButton).text(parseInt($(fbButton).text()) + 1);
}

// connect to the background page
var fbPort = chrome.extension.connect({name: "fb_msgs"});

// listen for Firebase messages forwarded from the background page
fbPort.onMessage.addListener(onMsgReceived);

// a button to send messages to Firebase
var buttonTemplate = "<div class='fb_button'>0</div>";

var fbButton = $(buttonTemplate).click(function() {
    // send messages to Firebase by way of the background script
    fbPort.postMessage({ body: new Date().toUTCString() });
});

fbButton = document.documentElement.appendChild(fbButton[0]);