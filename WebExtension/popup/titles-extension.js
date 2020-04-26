const browserFirefox  = "firefox";
const browserChromium = "chromium";
const browserUnknown  = "unknown";

let global_AllTabs;
let global_currentBrowser = browserUnknown;

function detectCurrentBrowser() {
	// Firefox has both chrome and browser as objects, but Chromium only has chrome and browser is undefined
	if ((typeof (browser) == "object") && (typeof (chrome) == "object")) {
		global_currentBrowser = browserFirefox;
	} else if ((typeof (browser) == "undefined") && (typeof (chrome) == "object")) {
		global_currentBrowser = browserChromium;
	} else {
		global_currentBrowser = browserUnknown;
		console.log('ERROR: unknown browser Chrome: [' + typeof chrome + '] Browser: [' + typeof browser + ']');
	}
	console.log('Current browser is: ' + global_currentBrowser);
}

function onDOMContentLoaded() {
	document.getElementById("btnCopy").addEventListener("click", clickCopyButton);
	document.getElementById("btnCopyAll").addEventListener("click", clickCopyAllButton);
	document.getElementById("btnCancel").addEventListener("click", clickCancelButton);
	document.getElementById("inptTitle").addEventListener("input", doUpdateResultOutput);
	document.getElementById("inptUrl").addEventListener("input", doUpdateResultOutput);
	document.getElementById("slctTarget").addEventListener("change", doUpdateResultOutput);
	document.getElementById("chckbxMode").addEventListener("change", doUpdateResultOutput);
	document.getElementById("rdHtml").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdMarkdown").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdWiki").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdMediaWiki").addEventListener("click", doUpdateResultOutput);

	if (global_currentBrowser == browserChromium) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			populateUI(tabs[0]);
		});
		chrome.tabs.query({}, function(tabsAll) {
			global_AllTabs = tabsAll;
		});
	} else if (global_currentBrowser == browserFirefox) {
		browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
			populateUI(tabs[0]);
		});
		browser.tabs.query({}).then((tabsAll) => {
			global_AllTabs = tabsAll;
		});
	}
}

function populateUI(tab) {
	if ((tab != null) && (tab.active)) {
		console.log('Active Tab URL: ' + tab.url);

		let inptTitle = document.getElementById('inptTitle');
		inptTitle.value = tab.title;
		let inptUrl = document.getElementById('inptUrl');
		inptUrl.value = tab.url;
		let txtrResult = document.getElementById('txtrResult');
		doUpdateResultOutput(null);
	} else {
		// should never get here
		console.log("There is no active tab!");
	}
}

function clickCopyButton(event) {
	copyResultsToClipboardAndClose();
}

function clickCopyAllButton(event) {
	let txtrResult = document.getElementById('txtrResult');
	let txtOutput = "";
	let bFoundPinned = false;
	let iWindowId = global_AllTabs[0].windowId;
	for (let tab of global_AllTabs) {
		// see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab
		if (tab.windowId != iWindowId) {
			iWindowId = tab.windowId;
			txtOutput += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
		}
		if (bFoundPinned && !tab.pinned) {
			txtOutput += "\n";
		}
		bFoundPinned = tab.pinned;
		txtOutput += tab.url;
		if (tab.incognito) {
			txtOutput += " [private]";
		}
		txtOutput += "\n";
	}
	txtrResult.textContent = txtOutput;
	copyResultsToClipboardAndClose();
}

function copyResultsToClipboardAndClose() {
	let txtrResult = document.getElementById('txtrResult');
	txtrResult.select();
	document.execCommand("copy");
	window.close(); //close the popup
}

function clickCancelButton(event) {
	window.close(); //close the popup
}

function doUpdateResultOutput(event) {
	console.log("Executing doUpdateResultOutput()");
	let oSlctTarget = document.getElementById('slctTarget');
	let oChckbxMode = document.getElementById("chckbxMode");
	
	let strTitle = document.getElementById('inptTitle').value;
	let strUrl = document.getElementById('inptUrl').value;
	let strTarget = oSlctTarget.value;
	let strType = document.querySelector('input[name="typeselection"]:checked').value;
	let bMode = oChckbxMode.checked;

	oSlctTarget.disabled = (strType != 0); // disable the HTML specific items when not HTML type
	document.getElementById("lblTarget").disabled = oSlctTarget.disabled;
	oStrUrl = new String(strUrl);
	oChckbxMode.disabled = !(oStrUrl.startsWith("http")); // disable checkbox for urls starting about, chrome etc

	let txtrResult = document.getElementById('txtrResult');
	txtrResult.textContent = assembleURL(strUrl, strTitle, strTarget, strType, bMode);
	console.log("Completed doUpdateResultOutput()");
}

function assembleURL(theURL, theTitle, theTarget, theType, bRelUrl) {
	console.log('Assembling the Output');
	strResult = "";
	if (bRelUrl) {
		urlComplete = new URL(theURL);
		iBaseLen = urlComplete.origin.length;
		strURL = '.' + urlComplete.href.substr(iBaseLen);
	} else {
		strURL = theURL;
	}
	let iType = parseInt(theType);
	switch (iType) {
		case 0:
			if (theTarget == "none") {
				strResult = '<a href="' + strURL + '">' + theTitle + '</a>';
			} else {
				strResult = '<a target="' + theTarget + '" href="' + strURL + '">' + theTitle + '</a>';
			}
			break;
		case 1:
			strResult = '[' + theTitle + '](' + strURL + ')';
			break;
		case 2:
			strResult = '{{' + theTitle + '|' + strURL + '}}';
			break;
		case 3:
			strResult = '[' + strURL + ' ' + theTitle + ']';
			break;
		default:
			strResult = "Unknown!";
			break;
	}
	return strResult;
}

detectCurrentBrowser();
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
