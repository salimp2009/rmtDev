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
  const clickedBtnEl = event.target.closest(".pagination__button");
  if (!clickedBtnEl) return;
  const nextPage = clickedBtnEl.className.includes("--next") ? true : false;
};

paginationEl.addEventListener("click", clickHandler);
