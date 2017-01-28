chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({
    	code: 'no_fingers_web_control.speechToggle();'
  	});
});