var TitlesExtension = {
    onToolbarButtonCommand: function(event) {
		strTheURL = TitlesExtension.getTheURL();
		strTheTitle = TitlesExtension.getTheTitle();
		var params = {inn:{url:strTheURL, title:strTheTitle}, out:null};       
		window.openDialog("chrome://titlesextension/content/copy_dialog.xul", "",
			"chrome,dialog,centerscreen,modal", params).focus();
		if (params.out) {
			// User clicked ok. Process changed arguments; e.g. write them to disk or whatever
			var finalURL = TitlesExtension.assembleURL(params.out.url, params.out.title, params.out.target, params.out.type);
			//alert(finalURL);
			TitlesExtension.copyToClipboard(finalURL);
		}
		else {
			// User clicked cancel. Typically, nothing is done here.
		}
	}
	,
	
	assembleURL: function(theURL, theTitle, theTarget, iType) {
		strResult = "";
		switch (iType) {
			case 0:
				strResult = '<a target="' + theTarget + '" href="' + theURL + '">' + theTitle + '</a>';
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
			default:
				strResult = "Unknown!";
				break;
		}
		return strResult;
	}
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