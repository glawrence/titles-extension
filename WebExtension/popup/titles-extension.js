const browserFirefox  = "firefox";
const browserChromium = "chromium";
const browserUnknown  = "unknown";

let global_AllTabs;
let global_currentBrowser = browserUnknown;

function onDOMContentLoaded() {
	document.getElementById("btnCopy").addEventListener("click", clickCopyButton);
	document.getElementById("btnCopyTitle").addEventListener("click", clickCopyButton);
	document.getElementById("btnCopyUrl").addEventListener("click", clickCopyButton);
	document.getElementById("btnCopyAll").addEventListener("click", clickCopyAllButton);
	document.getElementById("btnCancel").addEventListener("click", clickCancelButton);
	document.getElementById("inptTitle").addEventListener("input", doUpdateResultOutput);
	document.getElementById("inptUrl").addEventListener("input", doUpdateResultOutput);
	document.getElementById("slctTarget").addEventListener("change", doUpdateResultOutput);
	document.getElementById("chckbxUrlOnly").addEventListener("change", doUpdateResultOutput);
	document.getElementById("chckbxRemoveOrigin").addEventListener("change", doUpdateResultOutput);
	document.getElementById("chckbxRemoveQuery").addEventListener("change", doUpdateResultOutput);
	document.getElementById("chckbxRemoveFragment").addEventListener("change", doUpdateResultOutput);
	document.getElementById("rdHtml").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdMarkdown").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdWiki").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdMediaWiki").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdWikiMarkup").addEventListener("click", doUpdateResultOutput);

	if (global_currentBrowser == browserChromium) {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
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
	let srcId = event.srcElement.id;
	if (srcId === "btnCopyTitle") {
		copyElementTextToClipboard("inptTitle")
	} else if (srcId === "btnCopyUrl") {
		let bRelative = document.getElementById("chckbxRemoveOrigin").checked;
		let bRemoveQuery = document.getElementById("chckbxRemoveQuery").checked;
		let oUrl = document.getElementById('inptUrl');
		oUrl.value = processPathModes(oUrl.value, bRelative, bRemoveQuery);
		copyElementTextToClipboard("inptUrl")
	} else if (srcId === "btnCopy") {
		copyElementTextToClipboard('txtrResult');
	} else {
		console.error("Copy Unknown!");
	}
	closeExtensionWindow();
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
	copyElementTextToClipboard('txtrResult');
	closeExtensionWindow();
}

function clickCancelButton(event) {
	closeExtensionWindow();
}

function doUpdateResultOutput(event) {
	console.log("Executing doUpdateResultOutput()");
	let oSlctTarget = document.getElementById('slctTarget');
	let oChckbxRemoveOrigin = document.getElementById("chckbxRemoveOrigin");
	
	let strTitle = document.getElementById('inptTitle').value;
	let strUrl = document.getElementById('inptUrl').value;
	let strTarget = oSlctTarget.value;
	let strType = document.querySelector('input[name="typeselection"]:checked').value;
	let bRemoveOrigin = oChckbxRemoveOrigin.checked;

	let oLblTarget = document.getElementById("lblTarget");
	// disable the HTML specific items when not HTML type
	if (strType != 0) {
		oSlctTarget.disabled = true;
		oLblTarget.style.color = "DimGray";
	} else {
		oSlctTarget.disabled = false;
		oLblTarget.style.color = "Black";
	}

	let oLblRemoveOrigin = document.getElementById("lblRemoveOrigin");
	oStrUrl = new String(strUrl);
	// disable checkbox for urls starting about, chrome etc
	if ( !(oStrUrl.startsWith("http")) ) {
		oChckbxRemoveOrigin.disabled = true;
		oLblRemoveOrigin.style.color = "DimGray";
	} else {
		oChckbxRemoveOrigin.disabled = false; 
		oLblRemoveOrigin.style.color = "Black";
	}

	let bUrlOnly = document.getElementById("chckbxUrlOnly").checked;
	let bRemoveQuery = document.getElementById("chckbxRemoveQuery").checked;
	let bRemoveFragment = document.getElementById("chckbxRemoveFragment").checked;
	let txtrResult = document.getElementById('txtrResult');
	txtrResult.textContent = assembleURL(strUrl, strTitle, strTarget, strType, bRemoveOrigin, bUrlOnly, bRemoveQuery, bRemoveFragment);
	console.log("Completed doUpdateResultOutput()");
}

function processPathModes(inputURL, bNoOrigin, bNoQuery, bNoFragment) {
	urlComplete = new URL(inputURL);
	strURL = inputURL;
	console.log("Starting processPathModes");
	console.log(inputURL);
	console.log(urlComplete);
	if (bNoQuery) {
		urlComplete.search = "";
		strURL = urlComplete.href;
	}
	if (bNoFragment) {
		urlComplete.hash = "";
		strURL = urlComplete.href;
	}
	if (bNoOrigin) {
		// setting urlComplete.origin does not work as I want
		strURL = "." + urlComplete.pathname + urlComplete.search + urlComplete.hash;
	}
	console.log("URL = " + strURL);
	return strURL;
}

function assembleURL(theURL, theTitle, theTarget, theType, bRelUrl, bOnlyUrl, bRemoveQuery, bRemoveFragment) {
	console.log('Assembling the Output');
	strResult = "";

	strURL = processPathModes(theURL, bRelUrl, bRemoveQuery, bRemoveFragment);

	if (bOnlyUrl) {
		theTitle = strURL;
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
		case 4:
			strResult = '[' + strURL + '|' + theTitle + ']';
			break;
		default:
			strResult = "Unknown!";
			break;
	}
	return strResult;
}

function copyElementTextToClipboard(elementId) {
	let txtElement = document.getElementById(elementId);
	txtElement.select();
	document.execCommand("copy");
}

function closeExtensionWindow() {
	window.close(); //close the popup
}

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

detectCurrentBrowser();
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
