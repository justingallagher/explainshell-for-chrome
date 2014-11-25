var EXPLAIN_SHELL_ENV_INITIALIZED = "explain_shell_env_initialized";
var EXPLAIN_SHELL_ENABLE = "explain_shell_enable";
var EXPLAIN_SHELL_INJECT_TYPE = "explain_shell_inject_type";

function initializeEnv()
{
  if (EXPLAIN_SHELL_ENV_INITIALIZED in localStorage &&
    localStorage[EXPLAIN_SHELL_ENV_INITIALIZED])
    return;
  if (!(EXPLAIN_SHELL_ENABLE in localStorage)) {
    localStorage[EXPLAIN_SHELL_ENABLE] = true;
  }
  if (!(EXPLAIN_SHELL_INJECT_TYPE in localStorage)) {
    localStorage[EXPLAIN_SHELL_INJECT_TYPE] = 0;
  }

  localStorage[EXPLAIN_SHELL_ENV_INITIALIZED] = true;
}