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
  console.log(event.target);
  const clickedBtnEl = event.target.closest(".pagination__button");
};

paginationEl.addEventListener("click", clickHandler);
