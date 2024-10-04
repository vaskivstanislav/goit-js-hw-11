export const BASE_URL = "https://pixabay.com/api/";

export const API_KEY = "46069437-f48122ef32c6bd1c27031b929";

export function fetchPixabay(searchQuery) {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true`;
  
    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error("Sorry, there are no images matching your search query. Please try again!");
        }
        return response.json();
      });
  }