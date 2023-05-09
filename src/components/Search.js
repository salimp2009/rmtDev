import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

// SEARCH COMPONENT //
const submitHandler = async (event) => {
  event.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenExpression = /<[\s\S]*?script[\s\S]*?>/;
  const patternMatch = forbiddenExpression.test(searchText);
  if (patternMatch) {
    renderError("Search may not contain scripts");
    searchInputEl.value = "";
    return;
  }
  searchInputEl.blur();
  jobListSearchEl.innerHTML = "";

  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    const { jobItems: jobItem } = data;

    renderSpinner("search");
    numberEl.textContent = jobItem.length;
    renderJobList(jobItem);
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
