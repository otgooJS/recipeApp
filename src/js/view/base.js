export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultDiv: document.querySelector(".results"),
  searchResultList: document.querySelector(".results__list"),
  pageButtons: document.querySelector(".results__pages"),
  recipeDiv: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likesMenu: document.querySelector(".likes__field"),
  likesList: document.querySelector(".likes__list"),
};

//118_12.00:
export const elementString = {
  loader: "loader",
};

//118_09.57: Хайлт гарч ирчихсэн байхад loader эргэлдээд байгаа. Тиймээс арилгах!
//Яаж утсгах: html дээрээс parent-г нь олоод removeChild дээр нь устгах loader-г  зааж өгнө.
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

//118_04.52:
export const renderLoader = (parent) => {
  const loader = `
  <div class=${elementString.loader}>
  <svg>
    <use href="img/icons.svg#icon-cw"></use>
  </svg>
</div>
  `;
  //118_05.00: loader-г parent-руу оруулж өгье! position=afterbegin shuu!!
  parent.insertAdjacentHTML("afterbegin", loader);
};
