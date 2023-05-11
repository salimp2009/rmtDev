import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  const clickedBtnEl = event.target.closest(".sorting__button");

  if (!clickedBtnEl) return;

  const recent = clickedBtnEl.className.includes("--recent") ? true : false;

  if (recent) {
    state.searchJobItems.sort((current, next) => {
      return current.daysAgo - next.daysAgo;
    });
  } else {
    return next.relevanceScore - current.relevanceScore;
  }
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
