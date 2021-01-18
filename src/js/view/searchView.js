import { elements } from "./base";

//116b_09.44: Нэг элементийг дэлгэц дээр гаргаж өгдөг бас нэг f-тэй гээд үзчихье!
//Тухайн нэг жорыг хүлээж аваад дэлгэц дээр хэвлэж үзүүлдэг
//renderRecipe is a private function
const renderRecipe = (recipe) => {
  // console.log(recipe);
  //console.log(recipe.title);

  //116b_14.00: Хайлтын үр дүнг console дээр биш UI дээр хэвлэх
  const markup = `
  <li>
  <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;
  // ul -рүүгээ нэмнэ
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
//07.116b_25.18: UI-г цэвэрлэх:
export const clearSearchQuery = () => {
  elements.searchInput.value = " ";
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = " ";
  elements.pageButtons.innerHTML = " ";
};

//Утгыг return хийж бгааг санах!! Ганц мөр бгаа учраас return-г бичээгүй.
export const getInput = () => elements.searchInput.value;
//116b_09.01: Хайж олсон жороо console дээр биш UI дээр хэвлэе!
//export const renderRecipes = (recipes) => {

//119_03.10: Хуудас хуудсаар гаргахын тулд renderRecipes f-нд хуудасны дугаарыг хэлж өгдөг зүйлийг нэмж өгье! page = 1-default; resPerPage=10-Нэг хуудсанд хэдэн жор хэвлэх
export const renderRecipes = (recipes, CurrentPage = 1, resPerPage = 10) => {
  //Хайлтын үр дүнг хуудаслаж үзүүлэх
  //119_05.02: Ямар нэг массивын хэд дүгээр элемеитээс хэд дүгээр элемент хүртэл хэвлэхийг олох. If page=2, start=10, end=20
  const start = (CurrentPage - 1) * resPerPage;
  const end = CurrentPage * resPerPage;

  //массиваар давталт хийж хэвлэж гаргана. Нэг элементийг дэлгэж дээр гаргаж өгдөг бас нэг f-тэй гээд үзчихье!
  //recipes.forEach((el) => renderRecipe(el));
  //recipes.forEach(renderRecipe); //116b_12.00: Ойлгосон

  //119_07.00: Өмнө нь хайлтаар гарч ирсэн бүх жороо хэвлэсэн бол одоо:
  recipes.slice(start, end).forEach(renderRecipe);

  //Хуудаслалтын товчуудыг гаргаж ирэх 119_10.10
  const totalPages = Math.ceil(recipes.length / resPerPage); //4.2==>5
  renderButtons(CurrentPage, totalPages);
};

//119_15.35: Утгаа шууд createButton-руу буцаана
//119_22.00: Сумын f-ийг зарласнаас нь доош л дууддаг!!! So renderButtons f-ийн дээр нь авчирлаа.
//type===>'prev','next'
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
  <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>

</button>`;

//119_11.39 Одоо renderButtons гэсэн функцээ бичиж өгье
const renderButtons = (currentPage, totalPages) => {
  let buttonHtml; // button гэсэн хувьсагч руу тухайн button-ний html-ийг нь аваачаад хадгалья гэж үзье
  //Нөхцөл шалгая! 1-р хуудасны байвал 1хан товч гаргана
  if (currentPage === 1 && totalPages > 1) {
    //1-р хуудсан дээр бна. 2-р хуудас гэдэг товчийг гарга
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //Өмнөх болон дараагийн хуудс руу шилжих товчийг үзүүлэх
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    //Хамгийн сүүлийн хуудсан дээр бна. Өмнөх рүү шилжүүлэх товчийг л үзүүлнэ
    buttonHtml = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
