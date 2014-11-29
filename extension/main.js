var cnt = 0;

/**
 * Checks whether the given value is contained in the array.
 */
function contains(array, value)
{
  for (var i = array.length - 1; i >= 0; i--)
    if (array[i] === value)
      return true;
  return false;
}

/**
 * Sends a log to the trends website.
 */
function sendLog(url, title, command) {
  // Send json to server
  var tosend = { 'url': url,
                 'title': title,
                 'command': command };

  var xhr = new XMLHttpRequest();
  var target = TRENDS_SITE_ROOT + "/api/click/";
  xhr.open("POST", target, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(tosend));
}

/**
 * Return the corresponding URL of the doc page of a command
 * on the ExplainShell website.
 */
function wrapCommand(inject_type, cmd)
{
  if (cmd.length === 0) return cmd;
  var ans = "";

  if (inject_type == 0) {
    var url = "http://explainshell.com/explain?cmd=" + encodeURIComponent(cmd);
    var html = "<a target=\"_blank\" href=\"" + url + "\">" + cmd + "</a>";
    ans = html;
  } else if (inject_type == 1) {
    var html = "<span id=\"explain_shell_cmd_" + cnt.toString()
    + "\" data-toggle=\"popover\" rel=\"popover\" class=\"explain_shell_cmd\">"
    + cmd + "</span>";

    ++cnt;
    ans = html;
  } else {
    ans = cmd;
  }

  return ans;
}

/**
 * Given a DOM code block, we determine whether this block is considered
 * to consist of bash commands. If so, we return a dictionary specifying
 * the reasons why we consider this block to be a shell command.
 *
 * This returned dictionary object can be useful for future uses.
 */
function codeEnvIsShell($codeEnv)
{
  var reasons = [];

  // Detect if the parent of this code block is wrapped in a pre
  // environment which has class lang-sh, which is inserted by
  // Google prettyprint processor.
  var $parent = $codeEnv.parent();
  if ($parent.prop("tagName") === "PRE" &&
    $parent.hasClass("lang-sh")) {
    reasons.push("lang-sh");
  }

  // Detect if there is any line within this code block
  // that has a length of greater than 2 and starts with "$ ".
  var codeLines = $codeEnv.text().split("\n");
  for (var i = 0; i < codeLines.length; ++i) {
    var codeText = codeLines[i];
    if (codeText.length > 2 &&
      codeText[0] === "$" &&
      codeText[1] === " ") {
      reasons.push("dollar");
      break;
    }
  }

  // If the environment is not captured in the above filters,
  // we consider this environment as a non-bash command code block.
  return reasons;
}

/**
 * Inject a tags / hover to code environments that are
 * considered to contain bash commands.
 */
function injectCodeEnvs(inject_type)
{
  var $codeEnvs = $("code");
  $codeEnvs.each(function(index) {
    var isShellEnv = codeEnvIsShell($(this));
    // If current code block is not considered a bash command env,
    // then we don't do anything and return directly.
    if (isShellEnv.length === 0) return;

    // We first get rid of syntax highlighting, since this will
    // break our processing,
    $(this).html($(this).text());
    var codeLines = $(this).text().split("\n");
    var injectHTML = "";

    // We process this code block line by line.
    for (var i = 0; i < codeLines.length; ++i) {
      var codeText = codeLines[i];
      var rawCommand = codeText;
      // dollar    ==>   process only lines starting with "$ "
      // lang-sh   ==>   process all lines
      if (contains(isShellEnv, "dollar")) {
        if (rawCommand.length > 2 &&
          rawCommand[0] === "$" &&
          rawCommand[1] === " ") {
          rawCommand = rawCommand.substring(2, rawCommand.length);
          injectHTML +=
            codeText.replace(rawCommand, wrapCommand(inject_type, rawCommand))
              + "\n";
        } else {
          injectHTML += codeText + "\n";
        }
      } else {
        injectHTML +=
          codeText.replace(codeText, wrapCommand(inject_type, codeText)) + "\n";
      }
    };

    $(this).html(injectHTML);
  });
}

function setupPopOver(inject_type)
{
  if (inject_type !== 1) return;

  $.each($('[rel="popover"]'), function(index, value) {
    var $env = $(value);
    var url = "http://explainshell.com/explain?cmd=" +
      encodeURIComponent($env.text());
    var height = 500;
    var width = 1000;
    var ctnt =
      '<iframe frameborder="0" height="' + height.toString() +
      '" width="' + width.toString() +
      '" src="' + url + '"></iframe>';
    var env_id = "#" + $env.prop('id');
    $env.popover({
      title: 'Code explanation on ExplainShell',
      content: ctnt,
      html: true,
      placement: 'auto bottom',
      container: 'body'
    }).on("show.bs.popover", function() {
      // Send data
      sendLog(window.location.href, window.document.title, $env.text());

      // Open popup
      $(this).data("bs.popover").tip().css("max-width", "1050px");
    });
  });

  $('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!$(this).is(e.target) &&
        $(this).has(e.target).length === 0 &&
        $('.popover').has(e.target).length === 0) {
        $(this).popover('hide');
      }
    });
  });
}

$(document).ready(function() {
  chrome.storage.sync.get(default_settings, function(items) {
    if (items[EXPLAIN_SHELL_ENABLE] === true) {
      injectCodeEnvs(items[EXPLAIN_SHELL_INJECT_TYPE]);
      setupPopOver(items[EXPLAIN_SHELL_INJECT_TYPE]);
    }
  });
});
