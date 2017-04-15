function getCurrentTab() {
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
	});
}

function getCurrentWindowTabs() {
	return browser.tabs.query({currentWindow: true, active: true});
}

document.addEventListener("DOMContentLoaded", getCurrentTab);
