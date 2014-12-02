# ExplainShell for Chrome

## Table of Contents

- Team
- Project Overview
- Rationale
- Goals
- Technologies
- Approach
- Schedules
- Results
- Lessons Learned
- Summary

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
- VC with Git (on [Github](gitrepo))

## Approach
1. Rudimentary version of Chrome extension: Allow users to select text and lookup selected command.
1. Develop heuristics to identify and extract bash commands automatically from a web page
1. In-page link to jump to explainshell.com
1. Insert in-page summary on hover
1. Develop backend analytics site
1. Integrate analytics site with Chrome extension

## Original Schedule
- TODO

## Revised Schedule

## Results
- Chrome extension supports embedded links and popups
    - Still no public API for explainshell.com
    - Popups pull up the full explainshell website
    - HTTPS not supported
    - Reports correctly to the trends website
- Fully functional trends website
    - Track number of uses of extension
    - View clicks by time, source page, domain, and command
    - No authenication, API call in plain text Javascript

## Lessons Learned
- Plan lots of extra time to accommodate for changing schedules
    - We were often behind deadlines, causing others to be held up by bottlenecks
    - Keep people accountable to deadlines
- Contributing to open source software is a large undertaking
    - Need to read lots of documentation and unfamiliar code
    - Pull requests take time
    - A lot of work is necessary to do it properly
- Documenting your code is essential
    - We often had problems running each others' code
    - Time is wasted trying to decipher what code is doing rather than adding to it

## Summary
- Team
- Project Overview
- Rationale
- Goals
- Technologies
- Approach
- Schedules
- Results
- Lessons Learned
- Summary

## Demo
- TODO: screenshot.PNG

[es]: http://www.explainshell.com/
[gitrepo]: http://github.com/justingallagher/explainshell-for-chrome
