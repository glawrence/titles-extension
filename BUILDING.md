# Building Titles Extension
These are mostly notes to work as a reminder for me, this is because there is often a large gap between versions and hence I forget stuff I should know.

## Getting the Code
As ever there are multiple ways to do this, the easy, visual way is like this:

* Start File Explorer
* Create C:\Dev\GitHub
* Go to [GitHub Desktop](https://desktop.github.com/)
* Install GitHub Desktop
* When GitHub Desktop starts then login
* Set GitHub Desktop to use C:\Dev\GitHub for the Clone Path in the Settings
* Clone titles-extension

However I do like Visual Studio Code...

* Install Git from [Git - Downloads](https://git-scm.com/downloads)
* Load Visual Studio Code and make sure all existing work is closed
* In VS Code execute the command `Git: Clone`
* Paste in the URL, `https://github.com/glawrence/titles-extension.git`
* Select the directory C:\Dev\GitHub
* The repository will be cloned into C:\Dev\GitHub\titles-extension
* Then just open the folder in VS Code

## Editing the Code
My recommendation is to use [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/) for editing the code, although you can use [Notepad++ Download - Current Version](https://notepad-plus-plus.org/download/), in which case download and install Notepad++ 32-bit to get better plugin support.

## Testing the Extension
I am now supporting two primary browsers. Firefox and Microsoft Edge (Chromium), so I need to explain how to test an extension in both:

### Firefox Testing
You can use the release version of Firefox but I prefer to use the Developer Edition

* Go to [Mozilla Firefox Web Browser — Download Developer Edition](https://www.mozilla.org/firefox/all/#product-desktop-developer)
* Install Firefox Developer Edition, the 64-bit edition works great
* Start Firefox
* Select "Add-ons and Themes" from the "3 Bar Menu"
* Click the settings cog and select "Debug Add-ons"
* Then click the "Load Temporary Add-on..." button
* Browse to C:\Dev\GitHub\titles-extension\WebExtension and open manifest.json
* You can then click the "Inspect" button which is handy to help debug JavaScript issues or markup problems
* Now you can make changes and easily reload the extension

### Edge Testing
Microsoft do not have a "developer" edition, so I have worked with the release version, but clearly you could use the Beta channel.

* Go to [Download New Microsoft Edge Browser | Microsoft](https://www.microsoft.com/edge/)
* Install Microsoft Edge, although you might already have this on Windows 10, once the update to deploy Edge (Chromium) has been rolled out
* Load Edge and click on the "3 dots" menu and select "Extensions"
* Turn on "Developer Mode"
* Click "Load unpacked" and select C:\Dev\GitHub\titles-extension\WebExtension
* The extension should load and the button should be visible
* Right click the button and select "Inspect pop-up window"
* Now you can make changes and easily reload the extension

## Releasing
Currently the release process only runs on Windows and also relies on [7-Zip](https://www.7-zip.org/). The step are as follows:

* Make sure all changes are committed to git and pushed to GitHub
* If necessary, merge the working branch into the main branch
* Apply a tag to git and push this to GitHub (`git tag '2.5.0'` then `git push --tags`)
* Execute `Build-WebExtension.cmd` to produce `Titles-Extension.zip`
* In GitHub, go to [Releases · glawrence/titles-extension](https://github.com/glawrence/titles-extension/releases) and click "Draft a new release"
* Put the new version number in the "Tag version" box, for example "2.5.0"
* Set the Release Title to something like "Titles Extension - 2.5.0"
* Add some explanatory text, including links to any resolved issues
* Drag the file `Titles-Extension.zip` into the release
* Publish the release
* Close any fixed GitHub Issues
* Publish the new version as below for Firefox and Edge

### Firefox Add-ons
* Login to [Add-ons for Firefox (en-GB)](https://addons.mozilla.org/en-GB/firefox/)
* Got to [Manage My Submissions :: Developer Hub :: Add-ons for Firefox](https://addons.mozilla.org/en-GB/developers/addons) and click on the extension
* Click the option to "Upload a new version"
* Follow the instructions....

### Edge Extensions
This is documented at  [Publish An Extension - Microsoft Edge Development | Microsoft Docs](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/publish/publish-extension) but the key site is [Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview).