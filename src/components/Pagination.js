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
  }

  if (state.currentPage * 7 >= state.searchJobItems.length) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  paginationNumberNextEl.textContent = +(state.currentPage + 1);
  paginationNumberBackEl.textContent = +(state.currentPage - 1);

  paginationNumberNextEl.blur();
  paginationNumberBackEl.blur();
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
