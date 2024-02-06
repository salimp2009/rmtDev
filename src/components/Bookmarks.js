import {
  state,
  bookmarksBtnEl,
  jobListBookmarksEl,
  jobDetailsEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // event.preventDefault();
  if (!event.target.className.includes("bookmark")) return;

  if (
    state.bookMarkedItems.some(
      (jobItem) => jobItem.id === state.activeJobItem.id,
    )
  ) {
    state.bookMarkedItems = state.bookMarkedItems.filter(
      (bookMarkedjobItem) => bookMarkedjobItem.id !== state.activeJobItem.id,
    );
  } else {
    state.bookMarkedItems.push(state.activeJobItem);
  }

  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookMarkedItems),
  );

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
  renderJobList("search");
};

const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
jobDetailsEl.addEventListener("click", clickHandler);

// const bookMarkHandler = () => {
//   // console.log(state.activeJobItem.id);
//   state.bookMarkedItems.push(state.activeJobItem.id);
// };
// const jobDetailBookMarksBtn = jobDetailsEl.querySelector(
//   ".job-info__bookmark-btn"
// );

// bookmarksBtnEl.addEventListener("click", bookMarkHandler);
