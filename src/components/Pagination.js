import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
} from "../common.js";

import renderJobList from "./JobList.js";

const renderPaginationBtns = () => {
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
    paginationNumberNextEl.textContent = 2;
  }
  paginationNumberNextEl.textContent = +(state.currentPage + 1);
  paginationNumberBackEl.textContent = +(state.currentPage - 1);
};

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");
  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;
  nextPage ? state.currentPage++ : state.currentPage--;

  renderPaginationBtns();
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);
