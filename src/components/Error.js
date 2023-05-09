import { DEFAULT_DISPLAY_TIME, errorEl, errorTextEl } from "../common.js";

const renderError = (message = "Invalid Entry!") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

export default renderError;
