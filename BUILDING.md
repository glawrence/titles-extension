# Building Titles Extension
These instructions currently only cover working with the classic XUL based extension and do not cover working with Web Extensions.

* Go to [Mozilla Firefox Web Browser — Download Developer Edition](https://www.mozilla.org/en-US/firefox/developer/all/)
* Install Firefox Developer Edition
* Go to [GitHub Desktop](https://desktop.github.com/)
* Install GitHub Desktop
* Start GitHub Desktop and login
* Set GitHub Desktop to use C:\Dev\GitHub for the Clone Path
* Clone titles-extension
* Start Firefox
* Close Firefox
* Go to C:\Users\xxxxxxxx\AppData\Roaming\Mozilla\Firefox\Profiles\xxxxxxxx.dev-edition-default (where xxxxxxxx will vary)
* Create extensions directory
* Copy `titles@geoffdoesstuff.com` file from DevTools
* set xpinstall.signatures.required to False in about:config
* got to about:addons and enable Titles Extension
* restart Firefox
* add button to toolbar
* ready to develop!

Now use a text editor to modify the files under C:\Dev\GitHub\titles-extension\FirefoxClassic although you will need to stop and start Firefox Developer Edition to see the changes. Then when you are ready execute Build-FirefoxClassic.cmd to package the extension ready for submission to the Mozilla Add On site.
