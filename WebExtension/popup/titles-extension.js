function onDOMContentLoaded() {
	document.getElementById("btnCopy").addEventListener("click", clickCopyButton);
	document.getElementById("btnCancel").addEventListener("click", clickCancelButton);
	document.getElementById("inptTitle").addEventListener("input", doUpdateResultOutput);
	document.getElementById("inptUrl").addEventListener("input", doUpdateResultOutput);
	document.getElementById("slctTarget").addEventListener("change", doUpdateResultOutput);
	document.getElementById("chckbxMode").addEventListener("change", doUpdateResultOutput);
	document.getElementById("rdHtml").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdMarkdown").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdWiki").addEventListener("click", doUpdateResultOutput);
	document.getElementById("rdMediaWiki").addEventListener("click", doUpdateResultOutput);

	getCurrentWindowTabs().then((tabs) => {
		tab = tabs[0];
		if (tab.active) {
			console.log('Active Tab URL: ' + tab.url);

			let inptTitle = document.getElementById('inptTitle');
			inptTitle.value = tab.title;
			let inptUrl = document.getElementById('inptUrl');
			inptUrl.value = tab.url;
			let txtrResult = document.getElementById('txtrResult');
			doUpdateResultOutput(null);
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

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
