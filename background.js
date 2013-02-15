chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == "requestFirebaseScript") {
		console.log("Sending Firebase script to tab "+sender.tab.id+".");
		$.get("https://static.firebase.com/v0/firebase.js", function(data, textStatus, jsXHR) { 
			chrome.tabs.executeScript(sender.tab.id, {code: data} ); 
		}, "text");
		sendResponse({ body: "Injecting Firebase script."});
	}
});