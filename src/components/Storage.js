import { state } from "../common.js";

const storedJobItems = localStorage.getItem("bookmarkJobItems");

if (storedJobItems) {
  state.bookMarkedItems = JSON.parse(storedJobItems);
}
