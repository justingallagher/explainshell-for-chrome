# ExplainShell for Chrome

## Table of Contents

## Team
- Jake Zimmerman
- Justin Gallagher
- Ted Li
- Howard Chen

## Project Overview
- Chrome extension to provide easy lookup of bash command usage using [explainshell.com][es]
- Backend analytics site to show trending commands, referring sites, popular pages, etc.

## Rationales Behind ExplainShell
- Random bash commands found online pose threat to unsuspecting users
    - people have a risk of running malicious or insecure commands
- Often difficult to look through `man` pages for bash command usage
- Helps users discover and explore more bash commands

## Goals
- Develop Chrome Extension that identifies and extracts bash commands from web pages
    - Add a link to each bash commands that redirect users to the usage explanation on [explainshell.com][es]
    - Display friendly in-page popup of command usage when users hover over a bash command.
- Develop backend analytics site to keep track of bash commands that users lookup
- Eventually publish on Chrome Web Store for people to use

## Technologies Used
- Chrome Extension: HTML/CSS/Javascript
- Backend analyics site: Node.js
- VC with Git (on Github)

## Approach
1. Rudimentary version of Chrome extension: Allow users to select text and lookup selected command.
1. Develop heuristics to identify and extract bash commands automatically from a web page
1. In-page link to jump to explainshell.com
1. Insert in-page summary on hover
1. 

[es]: http://www.explainshell.com/