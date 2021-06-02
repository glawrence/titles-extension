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

	let browserObject = getBrowserObject();

	browserObject.tabs.query({currentWindow: true, active: true}, function(tabs) {
		populateUI(tabs[0]);
	});
	browserObject.tabs.query({}, function(tabsAll) {
		global_AllTabs = tabsAll;
	});

	setupUI();
}

function setupUI() {
	let browserObject = getBrowserObject();
	document.getElementById("spnVersion").innerText = browserObject.runtime.getManifest().version;
	document.getElementById("spnTitle").innerText = browserObject.runtime.getManifest().name;
	document.getElementById("spnDescription").innerText = browserObject.runtime.getManifest().description;
}

function populateUI(tab) {
	if ((tab != null) && (tab.active)) {
		console.log('Active Tab URL: ' + tab.url);

		let inptTitle = document.getElementById('inptTitle');
		inptTitle.value = tab.title;
		let inptUrl = document.getElementById('inptUrl');
		inptUrl.value = tab.url;
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
		let oUrl = document.getElementById("inptUrl");
		oUrl.value = callProcessPathModes();
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

	strUrl = callProcessPathModes();

	let bUrlOnly = document.getElementById("chckbxUrlOnly").checked;
	let txtrResult = document.getElementById('txtrResult');

	txtrResult.textContent = assembleOutputFormat(strUrl, strTitle, strTarget, strType, bUrlOnly);
	console.log("Completed doUpdateResultOutput()");
}

function callProcessPathModes() {
	let strUrl = document.getElementById('inptUrl').value;
	let bRemoveOrigin = document.getElementById("chckbxRemoveOrigin").checked;
	let bRemoveQuery = document.getElementById("chckbxRemoveQuery").checked;
	let bRemoveFragment = document.getElementById("chckbxRemoveFragment").checked;

	strUrl = processPathModes(strUrl, bRemoveOrigin, bRemoveQuery, bRemoveFragment);
	return strUrl;
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

function assembleOutputFormat(theURL, theTitle, theTarget, theType, bOnlyUrl) {
	console.log('Assembling the Output');
	strResult = "";

	if (bOnlyUrl) {
		theTitle = theURL;
	}
	let iType = parseInt(theType);
	switch (iType) {
		case 0:
			if (theTarget == "none") {
				strResult = '<a href="' + theURL + '">' + theTitle + '</a>';
			} else {
				strResult = '<a target="' + theTarget + '" href="' + theURL + '">' + theTitle + '</a>';
			}
			break;
		case 1:
			strResult = '[' + theTitle + '](' + theURL + ')';
			break;
		case 2:
			strResult = '{{' + theTitle + '|' + theURL + '}}';
			break;
		case 3:
			strResult = '[' + theURL + ' ' + theTitle + ']';
			break;
		case 4:
			strResult = '[' + theURL + '|' + theTitle + ']';
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

function getBrowserObject() {
	let browserObject;
	if (global_currentBrowser == browserChromium) {
		browserObject = chrome;
	} else if (global_currentBrowser == browserFirefox) {
		browserObject = browser;
	} else {
		console.error("Unknown browser");
	}
	return browserObject;
}

function detectCurrentBrowser() {
	// Firefox has both chrome and browser as objects, but Chromium only has chrome and browser is undefined
	if ((typeof (browser) == "object") && (typeof (chrome) == "object")) {
		global_currentBrowser = browserFirefox;
	} else if ((typeof (browser) == "undefined") && (typeof (chrome) == "object")) {
		global_currentBrowser = browserChromium;
	} else {
		global_currentBrowser = browserUnknown;
		console.error('ERROR: unknown browser Chrome: [' + typeof chrome + '] Browser: [' + typeof browser + ']');
	}
	console.log('Current browser is: ' + global_currentBrowser);
}

detectCurrentBrowser();
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
