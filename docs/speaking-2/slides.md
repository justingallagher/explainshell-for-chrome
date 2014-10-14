# ExplainShell for Chrome

## Table of Contents

## Problem
- Random code snippets pose threat to unsuspecting web users
    - people have a risk of running malicious or insecure commands
- Often difficult to look through `man` pages for relevant documentation
- Sites like [explainshell.com][es] make this easier, but there’s still a barrier
    - Have to copy, navigate to another page, paste

## Approach: Plan
1. Context menu link (select text and go)
1. In-page link to jump to explainshell.com
1. Insert in-page summary on hover
    - Contribute programmable API back to explainshell.com to facilitate in-page summary
1. Analytics site to show trending commands, referring sites, popular pages, etc.

## Approach: Chart
- TODO

## Approach: Methodology
- Chrome Extension: HTML/CSS/JavaScript
- [explainshell.com][es] (API)
- Backend for analytics and trends: Node.js
- VC with Git (hosted on GitHub)
  - [github.com/justingallagher/explainshell-for-chrome][efc]

## Literature Review
- [explainshell.com][es] and `man` pages
    - very comprehensive
    - hard to find new things to learn
- [bashoneliners.com][bol]
    - documents bash one-liners
    - sorts by popularity
    - limited by what is posted to site
- [linuxcommand.org][lc]
    - beginner's tutorial to the command line environment
    - hard to quickly grok
- [tldp.org][tldp]
    - incredibly widespread documentation on all things Linux
    - again, hard to quickly grok

## Benefits
- User can easily look up shell commands and determine what they do
- Educate user in bash
- Allow users to avoid running malicious or insecure commands 

## Qualifications
- Jake Zimmerman
    - 1 year full-stack web development
    - Interned at Bloomberg L.P. working on software engineering
- Justin Gallagher
    - 2 years of full-stack web development
    - Interned at Microsoft writing ASP.NET web apps
- Ted Li
    - Experience in iOS and web programming
    - Interned at Bloomberg L.P. doing natural language processing
- Howard Chen
    - Strong background in algorithmic thinking (15-210)
    - Taught principles of programming and software development, summer 2014

[es]: http://explainshell.com/
[efc]: http://github.com/justingallagher/explainshell-for-chrome
[bol]: http://www.bashoneliners.com/
[lc]: http://linuxcommand.org/
[tldp]: http://www.tldp.org/
