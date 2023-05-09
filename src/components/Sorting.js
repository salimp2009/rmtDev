import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";

const clickHandler = (event) => {
  const clickedBtnEl = event.target.closest(".sorting__button");

  if (!clickedBtnEl) return;

  const recent = clickedBtnEl.className.includes("--recent") ? true : false;

  if (recent) {
    // sort according to recency
  } else {
    // sort according relavency
  }
};

sortingEl.addEventListener("click", clickHandler);
