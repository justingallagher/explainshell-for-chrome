$(document).ready(function() {
  chrome.storage.sync.get(default_settings, function(items) {
    // Update status to let user know options were saved.
    if (items[EXPLAIN_SHELL_ENABLE] === true) {
      $("input[name='explain_shell_enable']").prop("checked", true);
    } else {
      $("input[name='explain_shell_enable']").prop("checked", false);
    }

    var $present_type_inputs = $("input[name='present_type']");
    $.each($present_type_inputs, function (index, value) {
      if (parseInt($(value).val()) === items[EXPLAIN_SHELL_INJECT_TYPE])
        $(value).prop("checked", true);
    });
  });    

  $("input[name='explain_shell_enable']").on("change", function() {
    var obj = {};
    obj[EXPLAIN_SHELL_ENABLE] = $(this).is(":checked");
    chrome.storage.sync.set(obj, function() {
      console.log("Persisted %o", obj);
    });
  });

  $("input[name='present_type']").on("change", function() {
    var obj = {};
    obj[EXPLAIN_SHELL_INJECT_TYPE] = parseInt($(this).val());
    chrome.storage.sync.set(obj, function() {
      console.log("Persisted %o", obj);
    });
  });
});