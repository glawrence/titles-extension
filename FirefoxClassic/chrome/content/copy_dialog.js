// Called once when the dialog displays
function onLoad() {
  // Use the arguments passed to us by the caller
  document.getElementById("url").value = window.arguments[0].inn.url;
  document.getElementById("title").value = window.arguments[0].inn.title;
  updatePreview();
}

// Called once if and only if the user clicks OK
function onOK() {
   // Return the changed arguments.
   // Notice if user clicks cancel, window.arguments[0].out remains null
   // because this function is never called
   window.arguments[0].out = {url:document.getElementById("url").value,
        title:document.getElementById("title").value,
		target:document.getElementById("target").value};
   return true;
}

function updatePreview() {
	strURL = document.getElementById("url").value;
	strTitle = document.getElementById("title").value;
	strTarget = document.getElementById("target").value;
	//alert(strTarget);
	document.getElementById("preview").value = TitlesExtension.assembleURL(strURL, strTitle, strTarget);
}