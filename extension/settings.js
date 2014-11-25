$(document).ready(function() {
  initializeEnv();
  if (Boolean(localStorage[EXPLAIN_SHELL_ENABLE]) === true) {
    $("input[name='explain_shell_enable']").prop("checked", true);
  } else {
    $("input[name='explain_shell_enable']").prop("checked", false);
  }

  var $present_type_inputs = $("input[name='present_type']");
  $.each($present_type_inputs, function (index, value) {
    if ($(value).val() === localStorage[EXPLAIN_SHELL_INJECT_TYPE])
      $(value).prop("checked", true);
  });

  $("input[name='explain_shell_enable']").on("change", function() {
    localStorage[EXPLAIN_SHELL_ENABLE] = $(this).is(":checked");
  });

  $("input[name='present_type']").on("change", function() {
    localStorage[EXPLAIN_SHELL_INJECT_TYPE] = parseInt($(this).val());
    console.log(localStorage[EXPLAIN_SHELL_INJECT_TYPE]);
  });
});