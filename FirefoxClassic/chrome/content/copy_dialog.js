// Called once when the dialog displays
function onLoad() {
  // Use the arguments passed to us by the caller
  document.getElementById("url").value = window.arguments[0].inn.url;
  document.getElementById("title").value = window.arguments[0].inn.title;
  updateGeneric();
}

// Called once if and only if the user clicks OK
function onOK() {
   // Return the changed arguments.
   // Notice if user clicks cancel, window.arguments[0].out remains null
   // because this function is never called
   window.arguments[0].out = {url:document.getElementById("url").value,
        title:document.getElementById("title").value,
		target:document.getElementById("target").value,
		type:document.getElementById("typeselection").selectedIndex,
		relurl:document.getElementById("relative-urls").checked};
   return true;
}

function updateGeneric() {
	//Only use this if you need both "Preview" and the User Interface updated, otherwise just call the one needed

	// update the output preview
	updatePreview();
	// update the user interface, enable/disable controls etc
	updateUserInterface();
}

function updateUserInterface() {
	xulTarget = document.getElementById("target");
	// update user interface: disable target selection for non-HTML output
	if (iOutputType > 0) {
		xulTarget.disabled = true;
	} else {
		xulTarget.disabled = false;
	}
}

function updatePreview() {
	strURL = document.getElementById("url").value;
	strTitle = document.getElementById("title").value;
	strTarget = document.getElementById("target").value;
	iOutputType = document.getElementById("typeselection").selectedIndex;
	bRelativeUrls = document.getElementById("relative-urls").checked;
	//alert(strTarget);
	document.getElementById("preview").value = TitlesExtension.assembleURL(strURL, strTitle, strTarget, iOutputType, bRelativeUrls);
}