# Building Titles Extension

## Current Version
These steps apply to the latest Web Extension version of the Titles Extension

* Start File Explorer
* Create C:\Dev\GitHub
* Go to [GitHub Desktop](https://desktop.github.com/)
* Install GitHub Desktop
* When GitHub Desktop starts then login
* Set GitHub Desktop to use C:\Dev\GitHub for the Clone Path in the Settings
* Clone titles-extension
* Go to [Notepad++ Download - Current Version](https://notepad-plus-plus.org/download/)
* Download and Install Notepad++ (32-bit to get better plugin support)
* Go to [Mozilla Firefox Web Browser — Download Developer Edition](https://www.mozilla.org/en-US/firefox/developer/all/)
* Install Firefox Developer Edition, the 64-bit edition works as well as 32-bit
* Start Firefox
* Browse to about:debugging#addons
* Click "Load Temporary Add-on"
* Browse to C:\Dev\GitHub\titles-extension\WebExtension and open manifest.json
* add button to toolbar
* ready to develop!


## Old XUL Version
These instructions currently only cover working with the classic XUL based extension and do not cover working with Web Extensions.

* Start File Explorer
* Create C:\Dev\GitHub
* Go to [GitHub Desktop](https://desktop.github.com/)
* Install GitHub Desktop
* When GitHub Desktop starts then login
* Set GitHub Desktop to use C:\Dev\GitHub for the Clone Path in the Settings
* Clone titles-extension
* Install [7-Zip](http://www.7-zip.org/) (for the packaging script)
* Go to [Notepad++ Download - Current Version](https://notepad-plus-plus.org/download/)
* Download and Install Notepad++ (32-bit to get better plugin support)
* Go to [Mozilla Firefox Web Browser — Download Developer Edition](https://www.mozilla.org/en-US/firefox/developer/all/)
* Install Firefox Developer Edition, the 64-bit edition works as well as 32-bit
* Start Firefox
* Select "Troubleshooting Information" from the help menu, locate "Profile Folder" and click the "Open Folder" button
* Create extensions sub-directory
* Close Firefox
* Copy `titles@geoffdoesstuff.com` file from C:\Dev\GitHub\title-extension\DevTools
* Start Firefox
* set xpinstall.signatures.required to False in about:config
* got to about:addons and enable Titles Extension
* restart Firefox
* add button to toolbar
* ready to develop!

Now use a text editor to modify the files under C:\Dev\GitHub\titles-extension\FirefoxClassic although you will need to stop and start Firefox Developer Edition to see the changes. Then when you are ready execute Build-FirefoxClassic.cmd to package the extension ready for submission to the Mozilla Add On site.
