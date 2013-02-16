var rootRef = new Firebase("https://fbinjection.firebaseio-demo.com/");

// forward messages from the fb_msgs port to Firebase
function onMsgReceived(msg) {
	console.log("received msg from injected script:", msg);
	rootRef.push(msg);
}

chrome.extension.onConnect.addListener(function(port) {
	if (port.name == "fb_msgs") {

		// listen for messages sent to the fb_msgs port
		port.onMessage.addListener(onMsgReceived);
		
		// forward messages from Firebase to the fb_msgs port
		rootRef.on("child_added", function(snap) {
			console.log("child_added:", snap.val());
			port.postMessage(snap.val());
		});

	}
});