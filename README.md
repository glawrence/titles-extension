# Titles Extension
A browser extension to get web page Titles with URLs and then format them for easy use on a website or content management system by generating the HTML or giving alternative output like Markdown. Whilst designed for my personal use with my Drupal site this should work in a variety of situations and therefore be of use to other people.

The best place to get Titles Extension from is [Titles Extension :: Add-ons for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/titles-extension/) as this is where the official, signed release is, that you can easily install into your Firefox.

# Building
The instructions for setting up your own development environment are in [BUILDING.md](BUILDING.md) which explains everything you need to do for modifying Titles Extension. This includes how to work with the old XUL style add-on even thought this has been replaced by the new Web Extension version.

# Issues
* No significant issues at present

# Plans
Now that the original XUL based add-on has been written as a Web Extension then I have some new plans. Generally, I would like to add some new features and improve the user interface. However now that it is a Web Extension, I would like to support other browsers, however a quick initial look suggests this might not be possible, yet.

# To Do
* <strike>Add the option to copy all tabs, although this will need an extra option to skip titles</strike>
* Convert build script to Python (to be cross platform)
* Update how the clipboard is used, I believe Firefox at least has an API now

# History
This is a brief history of my Titles Extension

## Pre-Release
The very first versions of the extension were for my own personal use. I just wanted a quick and easy way to simply get the URL of a web page, along with the title, of the page from the `<title>` tag in the HTML source. Doing this manually was hard work, so it was Firefox extension to the rescue.

## Version 1
I release the first public version when Firefox forced the use of signed extensions, without exception. At this point I decided the easy way to get my extension signed was to load it into [AMO](https://addons.mozilla.org/en-GB/firefox/extensions/) and of course it made sense then to release it as Open Source on [GitHub](https://github.com/).

## Version 2
This is the new Web Extension version and is currently supported in the latest version of Firefox.

## Version 2.5
There is no functional change in this release. All that has changed is that I have added support for Chromium based browsers. Whilst I did the development and testing with Microsoft Edge, I have also checked it works with Google Chrome and Brave.