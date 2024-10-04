import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchPixabay } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";

const refs = {
  form: document.querySelector(".form"),
  gallery: document.querySelector(".gallery"),
  loader: document.querySelector(".loader"),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.query.value.trim();

  if (query === "") {
    iziToast.show({
      title: 'Oops',
      message: "Sorry, there are no images matching your search query. Please try again!",
      color: "#ef4040",
      position: "bottomCenter"
    });
    return;
  }

  refs.gallery.innerHTML = "";
  showLoader();

  fetchPixabay(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          title: 'No results',
          message: "Sorry, there are no images matching your search query. Please try again!",
          color: "#ef4040",
          position: "bottomCenter"
        });
      } else {
        renderImages(data.hits, refs.gallery);
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        message: "Something went wrong. Please try again later.",
        color: "#ef4040",
        position: "bottomCenter"
      });
    })
    .finally(() => {
      hideLoader();
      refs.form.reset();
    });
}
function showLoader() {
  refs.loader.classList.remove("hidden");
}

function hideLoader() {
  refs.loader.classList.add("hidden");
}