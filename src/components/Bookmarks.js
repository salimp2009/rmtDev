import {
  state,
  bookmarksBtnEl,
  jobListBookmarksEl,
  jobDetailsEl,
} from "../common.js";

import renderJobList from "./JobList.js";
const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
};
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
