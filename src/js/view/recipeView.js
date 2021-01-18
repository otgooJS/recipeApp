/***************************************************************************
 * recipeView.js was created at 122_00.34
 ***************************************************************************/
import { elements } from "./base";
//import * as likesView from "./view/likesView";
const renderNairlaga = (orts) => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__ingredient">
           ${orts}
        </div>
    </li>`;

//123_00.35_Сонгож дарагдаад detailed жор нь голын UI дээр гарч ирсэн жорыг зүүн талын лист дээр арай тодруулж харуулах
export const highlightSelectedRecipe = (id) => {
  //123_07.30: Зүүн лист дээр click хийгдсэн болгон тодорч бна. Иймээс дараагийн жорыг дарахад өмнөх тодролыг болиулахыг хийе. results_link class-р нь цикл хийгээд бүгдэнгийх нь class-аас results__link--active-ийг буцааж авья.
  //document.querySelectorAll(".results__link"); //Энэ f маань nodeList буцаадаг

  const arr = Array.from(document.querySelectorAll(".results__link"));
  arr.forEach((el) => el.classList.remove(`results__link--active`));

  //Зүүн талын лист дээрээс click хийгдсэн жорны id-г барьж аваад select хийгээд   тод харагдуулах class-ийг оруулж өгөх
  const domObj = document.querySelector(`.results__link[href*="${id}"]`);
  if (domObj) domObj.classList.add("results__link--active");
};

export const clearRecipe = () => {
  //Одоо UI дээр харагдаж байгаа жорыг арилгана
  elements.recipeDiv.innerHTML = " ";
};

/** *     this.publisher = result.data.recipe.publisher;
    this.ingredients = result.data.recipe.ingredients;
    this.source_url = result.data.recipe.source_url;
    this.img_url = result.data.recipe.img_url;
    this.publisher_url = result.data.recipe.publisher_url;
    this.title = result.data.recipe.title;
    this.recipe_id = result.data.recipe.recipe_id;
    this.social_rank = result.data.recipe.publisher; */

//export const renderRecipe = (recipe) => {
//127_08.57: like оруулж өгөх
export const renderRecipe = (recipe, isLiked) => {
  //Нэтээс хайгаад олчихсон бгаа жорыг UI дээр үзүүлнэ
  //const html = recipe.title;
  const html = `
  <figure class="recipe__fig">
  <img src="${recipe.img_url}" alt="${recipe.title}" class="recipe__img">
  <h1 class="recipe__title">
      <span>${recipe.title}</span>
  </h1>
</figure>
<div class="recipe__details">
  <div class="recipe__info">
      <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.time
      }</span>
      <span class="recipe__info-text"> минут </span>
  </div>
  <div class="recipe__info">
      <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.huniiToo
      }</span>
      <span class="recipe__info-text"> хүний орц</span>

      <div class="recipe__info-buttons">
          <button class="btn-tiny">
              <svg>
                  <use href="img/icons.svg#icon-circle-with-minus"></use>
              </svg>
          </button>
          <button class="btn-tiny">
              <svg>
                  <use href="img/icons.svg#icon-circle-with-plus"></use>
              </svg>
          </button>
      </div>

  </div>
  <button class="recipe__love">
      <svg class="header__likes">
          <use href="img/icons.svg#icon-heart${
            isLiked ? "" : "-outlined"
          }"></use>
      </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <ul class="recipe__ingredient-list">

  ${recipe.ingredients.map((el) => renderNairlaga(el)).join(" ")};

  </ul>

  <button class="btn-small recipe__btn">
      <svg class="search__icon">
          <use href="img/icons.svg#icon-shopping-cart"></use>
      </svg>
      <span>САГСАНД ХИЙХ</span>
  </button>
</div>

<div class="recipe__directions">
  <h2 class="heading-2">Хэрхэн бэлтгэх вэ</h2>
  <p class="recipe__directions-text">
      Жорыг бэлтгэж оруулсан
      <span class="recipe__by">${
        recipe.publisher
      }</span>. Манай вэб сайтаас жорын зааврыг авна уу
  </p>
  <a class="btn-small recipe__btn" href="${recipe.source_url}" target="_blank">
      <span>ЗААВАР ҮЗЭХ</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
      </svg>

  </a>
</div>`;
  elements.recipeDiv.insertAdjacentHTML("afterbegin", html);
};
