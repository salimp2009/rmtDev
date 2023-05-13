import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
} from "../common.js";

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");
  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;
  nextPage ? state.currentPage++ : state.currentPage--;
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);
