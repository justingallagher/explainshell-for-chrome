# ExplainShell for Chrome

A chrome extension which automates looking up shell commands on [http://explainshell.com/](http://explainshell.com). 

## Authors

This project is being developed by Jake Zimmerman, Justin Gallagher, Ted Li, and Howard Chen as a part of the final project for 15-221 Technical Communications for Computer Scientists.

## Directory Structure

- The `lib/` directory contains the actual chrome extension.
- The `www/` directory contains the Node.js app that can be used to run a "trends" site
- The `ref/` directory contains some sample code relevant to creating our extension, convientenly downloaded so we don't have to keep redownloading it.
- The `handout/` directory contains documents describing the requirements for various phases (mirrored here for the sake of convenience). PDFs are preferred to MS Office files.
- The `docs/` directory contains planning documents, written assignments, and presentation slides.

## Historical Documentation

I followed [this tutorial][tutorial] when setting up the Node.js boilerplate structure. Some important commands that I ran:

```bash
# from root of project
# You will have to already have installed Node.js
npm install -g express
npm install -g express-generator
express --css compass www
mkdir data
cd www && npm install
```

I then edited the `"name"` field in `package.json` to something more reasonable.

__For those who want to get set up to be able to run the app__: you will only have to run the last two commands.

## Setting up MongoDB

There's a walkthrough of getting Mongo set up in the [tutorial][tutorial] I mentioned earlier, but here's a quick walkthrough:

```bash
$ brew install mongodb # substitute your package manager here
# Note: If you don't have a package manager (coughwindowscough) then download it from online

# From the www/ directory: start the mongo daemon
$ mongod --dbpath data
```

## Setting up Compass

__This is really important__: we're using Compass for CSS preprocessing. Don't edit CSS files manually!! Find the file that is used to generate the corresponding CSS file and edit that file instead.

```bash
# install Compass
$ brew install compass # Again, insert your package manager here, or download from online

# From www/ directory:
# Compile the stylesheets once
$ compass compile

# Compile the stylesheets continuously as you change them
$ compass watch
```

## Chrome Extension APIs Reference

To create the actual Chrome extension, we're using the `contextMenus` API and the `tabs` API. The following links have been helpful:

- [contextMenus reference](https://developer.chrome.com/extensions/contextMenus)
- [contextMenus sample](https://developer.chrome.com/extensions/samples#search:contextmenus)
- [tabs reference](https://developer.chrome.com/extensions/tabs)

## explainshell.com

explainshell.com is a project by [idank](/idank) that parses shell commands, finds the revelant pieces of documentation for the commands, flags, and syntax, and displays them to the user. This chrome extension allows you to click on commands from within chrome and jump to their documentation on explainshell.com for a seamless workflow. If you haven't already, you should check out [his project](/idank/explainshell) on GitHub as well!

## License

MIT License. See LICENSE.

[tutorial]: http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
