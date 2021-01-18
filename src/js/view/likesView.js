import { elements } from "./base";

//127_00.00 likesView.js created
export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  //217_04.00
  /**
            <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
            </button> */
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconString}`);
};
//127_15.45: Favourite heart-ийг visible болон hidden
export const toggleLikeMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

//127_22.30:
export const renderLike = (newLike) => {
  const html = `
    <li>
        <a class="likes__link" href="#${newLike.id}">
            <figure class="likes__fig">
                <img src="${newLike.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${newLike.title}</h4>
                <p class="${newLike.publisher}">The Pioneer Woman</p>
            </div>
        </a>
    </li>`;
  elements.likesList.insertAdjacentHTML("beforeend", html);
};
//127_28.06: Тухайн цэсэн дээр /голын/ like дарахад favourite heart листэнд бичигдэж байгаа бол unlike болгоход favourite heart листнээс хасагдах f бичье
export const deleteLike = (id) => {
  const li = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement;
  //127_33.38:
  if (li) li.parentElement.removeChild(li);
};
