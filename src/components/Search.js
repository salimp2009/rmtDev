import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  state,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  jobListSearchEl,
  numberEl,
  getData,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationBtns from "./Pagination.js";

// SEARCH COMPONENT
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
  sortingBtnRelevantEl.classList.add("sorting__button--active");
  sortingBtnRecentEl.classList.remove("sorting__button--active");

  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    const { jobItems } = data;
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    renderSpinner("search");
    numberEl.textContent = jobItems.length;

    renderPaginationBtns();
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
