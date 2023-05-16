import {
  BASE_API_URL,
  getData,
  jobDetailsContentEl,
  state,
} from "../common.js";

import renderSpinner from "./Spinner.js";
import { renderJobDetails } from "./JobDetails.js";
import renderError from "./Error.js";

const loadHashChangeHandler = async () => {
  const id = window.location.hash.substring(1);
  if (id) {
    jobDetailsContentEl.innerHTML = "";
    renderSpinner("job-details");
    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);
      const { jobItem } = data;

      state.activeJobItem = jobItem;
      renderSpinner("job-details");
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};
window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
