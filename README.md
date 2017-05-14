# Titles Extension
A browser extension to get web page URLs and their page titles and then format them for easy use on a website or content management system by generating the HTML or other type of output. Whilst designed for my personal work with my Drupal site this should work in a variety of situations and therefore be of use to other people.

The best place to get Titles Extension from is [Titles Extension :: Add-ons for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/titles-extension/) as this is where the official, signed release is, that you can easily install into your Firefox.

# Building
The instructions for setting up your own development environment are in [BUILDING.md](BUILDING.md) which explains everything you need to do for modifying Titles Extension, currently this covers the old XUL style add-on as the Web Extension version has not been developed yet.

# Issues
* Multiprocess Firefox is not supported

# Plans
Currently the Titles Extension has been developed as a classic Firefox Extension using XUL and JavaScript. The plan is to port this into a WebExtension and then easily support other browsers, however a quick initial look suggests this might not be possible, yet. In addition and more urgently I need to prepare for [Multiprocess Firefox](https://developer.mozilla.org/en-US/Firefox/Multiprocess_Firefox), aka Electrolysis or e10s. Clearly, like all responsible extension developers one needs to keep an eye on items in Mozilla's roadmap.

# To Do
* Add the option to copy all tabs, although this will need an extra option to skip titles
* Convert build script to Python (to be cross platform)
* Make version 2 as a [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
