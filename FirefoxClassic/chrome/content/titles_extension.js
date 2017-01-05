var TitlesExtension = {
    onToolbarButtonCommand: function(event) {
		strTheURL = TitlesExtension.getTheURL();
		strTheTitle = TitlesExtension.getTheTitle();
		var params = {inn:{url:strTheURL, title:strTheTitle}, out:null};       
		window.openDialog("chrome://titlesextension/content/copy_dialog.xul", "",
			"chrome,dialog,centerscreen,modal", params).focus();
		if (params.out) {
			// User clicked ok. Process changed arguments; e.g. write them to disk or whatever
			var finalURL = TitlesExtension.assembleURL(params.out.url, params.out.title, params.out.target, params.out.type, params.out.relurl);
			//alert(finalURL);
			TitlesExtension.copyToClipboard(finalURL);
		}
		else {
			// User clicked cancel. Typically, nothing is done here.
		}
	}
	,
	
	assembleURL: function(theURL, theTitle, theTarget, iType, bRelUrl) {
		// For reference:
		//                https://developer.mozilla.org/en-US/docs/Web/API/URL 
		//                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
		strResult = "";
		if (bRelUrl) {
			urlComplete = new URL(theURL);
			iBaseLen = urlComplete.origin.length;
			strURL = '.' + urlComplete.href.substr(iBaseLen);
		} else {
			strURL = theURL;
		}
		switch (iType) {
			case 0:
				if (theTarget == "None") {
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
		return strResult;	}
	,

	copyToClipboard: function(strText) {
		const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                                   .getService(Components.interfaces.nsIClipboardHelper);
        gClipboardHelper.copyString(strText);
	}
	,

	getTheURL: function() {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
           getService(Components.interfaces.nsIWindowMediator);
        var recentWindow = wm.getMostRecentWindow("navigator:browser");
        return recentWindow ? recentWindow.content.document.location : null;
    }
	,

	getTheTitle: function() {
        var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
           getService(Components.interfaces.nsIWindowMediator);
        var recentWindow = wm.getMostRecentWindow("navigator:browser");
        return recentWindow ? recentWindow.content.document.title : null;
    }
}