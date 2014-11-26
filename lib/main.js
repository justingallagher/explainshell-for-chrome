// Check the README for links to pages I found useful when writing this

function jumpToExplainShell(info, tab) {
  if(!info.selectionText) {
    console.log("Error getting selection text.");
    return;
  }

  var url = "http://explainshell.com/explain?cmd=" +
                encodeURIComponent(info.selectionText);

  console.log("About to create tab at: " + url);

  chrome.tabs.create({ "url": url }, function callback() {
    if(chrome.extension.lastError) {
      console.log("Error opening new tab: " +
          chrome.extension.lastError.message);
    }
    else {
      console.log("Tab created.");
    }
  });

  // Send json to server
  var tosend = { 'url': tab.url,
                 'title': tab.title,
                 'command': info.selectionText };

  var xhr = new XMLHttpRequest();
  var target = "http://localhost:3000/api/click/";
  xhr.open("POST", target, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(tosend));
}

var menuItemId = chrome.contextMenus.create({
  // %s will be populated with the text of the selection
  "title": "Lookup on explainshell.com",
  "contexts": ["selection"],
  "onclick": jumpToExplainShell
});

console.log("Created menu item (id: " + menuItemId + ")");
