import {
  BASE_API_URL,
  getData,
  jobDetailsContentEl,
  jobListSearchEl,
  state,
  RESULTS_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import { renderJobDetails } from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = (whichJobList = "search") => {
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  jobListEl.innerHTML = "";

  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      (state.currentPage - 1) * RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE,
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookMarkedItems;
  }

  jobItems.forEach((jobItem) => {
    const newJobItemHTML = `
        <li class="job-item ${
          state.activeJobItem.id === jobItem.id && "job-item--active"
        }">
        <a class="job-item__link" href="${jobItem.id}">
          <div class="job-item__badge">${jobItem.badgeLetters}</div>
            <div class="job-item__middle">
              <h3 class="third-heading">${jobItem.title}</h3>
              <p class="job-item__company">${jobItem.company}</p>
            <div class="job-item__extras">
              <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${
                jobItem.duration
              }</p>
              <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${
                jobItem.salary
              }</p>
              <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${
                jobItem.location
              }</p>
            </div>
          </div>
            <div class="job-item__right">
            <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
              state.bookMarkedItems.some(
                (bookmarkJobItem) => bookmarkJobItem.id === jobItem.id,
              ) && "job-item__bookmark-icon--bookmarked"
            }"></i>
            <time class="job-item__time">${jobItem.daysAgo}d</time>
            </div>
        </a>
        </li>
        `;
    jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });
};

// JOB LIST SEARCH COMPONENT

const clickHandler = async (event) => {
  event.preventDefault();

  const jobItemEl = event.target.closest(".job-item");

  // ? operator makes it the following item as optional like a if-check
  // remove the active class from prev. active job items
  document
    .querySelectorAll(".job-item--active")
    .forEach((activejobItem) =>
      activejobItem.classList.remove("job-item--active"),
    );

  jobDetailsContentEl.innerHTML = "";

  renderSpinner("job-details");

  const id = jobItemEl.children[0].getAttribute("href");

  const allJobItems = [...state.searchJobItems, ...state.bookMarkedItems];
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);

  renderJobList("search");

  history.pushState(null, "", `/#${id}`);

  try {
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    const { jobItem } = data;

    renderSpinner("job-details");
    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;
