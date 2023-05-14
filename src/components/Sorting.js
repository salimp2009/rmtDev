import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";

import renderPaginationBtns from "./Pagination.js";

const clickHandler = (event) => {
  const clickedBtnEl = event.target.closest(".sorting__button");

  if (!clickedBtnEl) return;

  state.currentPage = 1;
  const recent = clickedBtnEl.className.includes("--recent") ? true : false;

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    sortingBtnRecentEl.classList.remove("sorting__button--active");
  }

  if (recent) {
    state.searchJobItems.sort((current, next) => {
      return current.daysAgo - next.daysAgo;
    });
  } else {
    state.searchJobItems.sort((current, next) => {
      return next.relevanceScore - current.relevanceScore;
    });
  }
  renderPaginationBtns();
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
