function getCurrentTab() {
	document.getElementById("btnCopy").addEventListener("click", clickCopyButton);
	getCurrentWindowTabs().then((tabs) => {
		tab = tabs[0];
		if (tab.active) {
			console.log('Active Tab URL: ' + tab.url);

			let inptTitle = document.getElementById('inptTitle');
			inptTitle.value = tab.title;
			let inptUrl = document.getElementById('inptUrl');
			inptUrl.value = tab.url;
			let txtrResult = document.getElementById('txtrResult');
			txtrResult.textContent = '<a href="' + tab.url + '">' + tab.title + '</a>';
		} else {
			//hmm, what do we do here?
		}

	});
}

function getCurrentWindowTabs() {
	return browser.tabs.query({currentWindow: true, active: true});
}

function clickCopyButton(event) {
	let txtrResult = document.getElementById('txtrResult');
	//txtrResult.focus();
	txtrResult.select();
	document.execCommand("copy");
}

document.addEventListener("DOMContentLoaded", getCurrentTab);

document.addEventListener("click", function(e) {

  if (e.target.id === "copy-link") {
    //browser.tabs.create({url: "https://developer.mozilla.org/en-US/Add-ons/WebExtensions"});
	clickCopyButton(e);
  }

  e.preventDefault();
});
