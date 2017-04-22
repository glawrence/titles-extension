function getCurrentTab() {
	document.getElementById("btnCopy").addEventListener("click", clickCopyButton);
	getCurrentWindowTabs().then((tabs) => {
		let tabsList = document.getElementById('tabs-list');
		let currentTabs = document.createDocumentFragment();

		tabsList.textContent = '';

		tab = tabs[0];
		if (tab.active) {
			let newPara = document.createElement('p');
			newPara.textContent = 'Title: ' + tab.title;
			currentTabs.appendChild(newPara);

			let newPara2 = document.createElement('p');
			newPara2.textContent = 'URL: ' + tab.url;
			currentTabs.appendChild(newPara2);

			console.log('Active Tab URL: ' + tab.url);
		}

		tabsList.appendChild(currentTabs);
		let txtrResult = document.getElementById('txtrResult');
		txtrResult.textContent = '<a href="' + tab.url + '">' + tab.title + '</a>';
	});
}

function getCurrentWindowTabs() {
	return browser.tabs.query({currentWindow: true, active: true});
}

function clickCopyButton(event) {
	//alert('Hello from clickCopyButton function');
	let txtrResult = document.getElementById('txtrResult');
	//alert(txtrResult.value);
	//I think the issue is the button takes focus and hence none of this really works!
	txtrResult.focus();
	//txtrResult.setSelectionRange(1, 10);
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
