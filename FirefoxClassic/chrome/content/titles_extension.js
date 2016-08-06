var TitlesExtension = {
    onToolbarButtonCommand: function(event) {
		strTheURL = TitlesExtension.getTheURL();
		strTheTitle = TitlesExtension.getTheTitle();
		var params = {inn:{url:strTheURL, title:strTheTitle}, out:null};       
		window.openDialog("chrome://titlesextension/content/copy_dialog.xul", "",
			"chrome,dialog,centerscreen,modal", params).focus();
		if (params.out) {
			// User clicked ok. Process changed arguments; e.g. write them to disk or whatever
			var finalURL = TitlesExtension.assembleURL(params.out.url, params.out.title, params.out.target);
			//alert(finalURL);
			TitlesExtension.copyToClipboard(finalURL);
		}
		else {
			// User clicked cancel. Typically, nothing is done here.
		}
	}
	,
	
	assembleURL: function(theURL, theTitle, theTarget) {
		return '<a target="' + theTarget + '" href="' + theURL + '">' + theTitle + '</a>';
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