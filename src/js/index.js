/*//************************************************************************
FINAL WEB APP-RECIPE*/

require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import * as likesView from "./view/likesView";
import * as listView from "./view/listView"; //Олон юм авах учраас * гэчихье
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";

// searchView-с олон юм авах учраас "searchView.data" г.м цэг бичиж бгаад авна гэж зарлаж бна
import * as searchView from "./view/searchView";

/*//07.115_04.55 Class-ийн Object-г үүсгэе!
let search = new Search("pasta");
search.doSearch().then((r) => console.log(r)); //07.115_06.36 async f-р буцаагдсан утгууд promise-р дамжиж ирдэг тул авахдаа promise-н then-р /амлалт биелэсэн бол/ дамжуулж авна.*/

/***********************************************************************
//07.116_02.46 Вэб апп-ын ТӨЛӨВ: 
-Хайлтын query үр дүн
-Тухайн үзүүлж байгаа жор
-Лайзалсан жорууд
-Захиалсан жорын найрлагууд
***********************************************************************/

const state = {}; //Дөнгөж апп эхлэхэд төлөв хоосон бна.
//127_21.40: Favourite like-ийг хаах
//elements.likesMenu.style.visibility = "hidden"; //add by Otgoo
//likesView.toggleLikeMenu(0); // teacher option //128_14.00 This code moved to...

/**** 121_02.00: Let's remember about what is controller? -Сонтроллэр гэж юу билээ гэдгээ эргэн саная!
Model, view 2-ыг холбож өгдөг зүлийг controller гэдэг. model==> controller <==view
*MYC: Хайлтын контроллер=
 *
 * */
/*********************************************************************
 * *******************************************************************/
const controlSearch = async () => {
  console.log(`дарагдлаа!!!`);
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  //const query = "pizza"; //Үүнийг UI-с авах ёстой. Энэ кодыг searchView-д бичиж өгнө.
  const query = searchView.getInput();

  if (query) {
    // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
    //...Хайлтын обьектийг үүсгээд state-руу хийж өгнө.
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж UI-ийг бэлдэж өгнө.
    //07.116b_25.18: UI-г цэвэрлэх:
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    //console.log(state.search.result);
    clearLoader();
    if (state.search.result === undefined) alert(`Хайлтаар илэрцгүй...`);
    //else searchView.renderRecipes(state.search.result);
    //119_04.00:
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); //07.116_09.00 Default ү/а-г болиулах. Default нь "Дарагдлаа" гээд гялалзаж алга болоод бна.
  controlSearch();
});

//119_27.30 Анхнаасаа байхгүй бгаа Хуудас товчин дээр яаж листенэр холбох вэ гэхээр parent дээрээс нь барьж авна /124_06.55: controlList/
elements.pageButtons.addEventListener("click", (e) => {
  //119_28.53: Дарагдсан товчийг олох боломжтой.
  //e==> манай click хийгдсэн event
  //e.target==> click хийгдсэн обьектийн DOM дээрх элемент нь гарч ирдэг
  //closest==> ямар нэг CSS элементэд хамгийн ойр тухайн DOM дээр байгаа элементийг олж өгдөг функц.
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNr = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNr);
  }
});

const r = new Recipe(47746);
r.getRecipe();

/*** 121_03.23: Let's create the next controller. What would it be?
 * Жорын контроллер
 */

//121_03.40: Эхлээд hash өөрчлөгдөж байгаа event-iig барьж авна гэсэн бгаа.

/*********************************************************************
 * *******************************************************************/
const controlRecipe = async () => {
  // 1) URL-аас id-ийг салгаж авна
  // const id = window.location;
  const id = window.location.hash.replace("#", ""); //121_08.24
  //console.log(id);

  //127_13.50: Хэрэв state.like хоосон бвал LIKE-ийн моделийг үүсгэ. Би ашиглах гэж бна.
  //if (!state.likes) state.likes = new Like(); //128_13.10: This code moved to...

  //124_01.10: Вэб дөнгөж эхлэнгүүт голын лист дээр renderLoader ажиллаад бна. Тэрийг id олдоогүй үед гаргахгүй байхаар болгое
  /*if (id) {
    //бусад бүх кодыг энэ дотор хийж өгөх!!!
  }*/
  //URL дээр id бгаа эсэхийг шалгана
  if (id) {
    //бусад бүх кодыг энэ дотор хийж өгөх!!!
    // 2) Жорын моделийг /detailed recipe/ үүсгэж өгнө. 120 хичээл дээр бид уг моделийг үүсгэчихсэн
    state.recipe = new Recipe(id); //121.09.20

    // 3) UI дэлгэцийг /голын/ бэлтгэнэ.
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);

    // 4) Жороо татаж авчирна
    await state.recipe.getRecipe();

    // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6) Жороо дэлгэцэнд гаргана
    //console.log(state.recipe);
    //renderRecipe(state.recipe);
    //127_10.58: Энэ жор лайклагдсан эсэхийг мэдэх хэрэгтэй.
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

//window.addEventListener("hashchange", controlRecipe);

//122_18.45 Вэбийг refresh хийхээр UI дээрх бүх мэдээлэл алга болж байгааг болиулах
//window.addEventListener("load", controlRecipe);

//124_02.34: Хоёр f-ийг нийлүүлж бичиж болно
//window.addEventListener("hashchange", controlRecipe);
//window.addEventListener("load", controlRecipe);

//event-ийг e гэж оруулсан ч болно
[`hashchange`, `load`].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

//128_12.50: Вэб дөнгөж ачаалагдаж ирэнгүүт load дуудагдана. Тэр үед нь like моделийг үүсгэх хэрэгтэй

window.addEventListener("load", (e) => {
  //Шинээр лайк моделийг апп дөнгөж ачаалагдахад үүсгэнэ.
  if (!state.likes) state.likes = new Like(); //128_13.10: This code is brought from above

  //Лайк цэсийг гаргах эсэхийг шийдэх
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes()); //128_14.00: This code is brought from above

  //128_15.10: Эцэст нь лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна.
  //Бүх лайкаараа давталт хийнэ.
  //state.likes.likes.forEach((like) => likesView.renderLike(like));
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

/**
 124_06.55: Найрлаганы контроллер хэрэгтэй. Гэтэл гол асуудал нь "САГСАНД ХИЙХ" гэсэн товч маань вебийг анх ажлуулахад бхгүй. Тэгвэл "анх бхгүй" товчин дээр листенэр хийхийн тулд гаднах том div дээр нь тавьчихья. //119_27.30 pageButtons/
 */

/*elements.recipeDiv.addEventListener("click", (e) => {
  console.log("aa"); //голын хэсгийн аль нэг газар click хийхэд "аа" гэж гарч бна.
});*/

/*elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(`.recipe__btn`)) {
    console.log(`зөвхөн сагсанд хийх-ийн арын товчны дүрс`); //зөвхөн сагсанд хийх-ийн арын дүрсэн дээр дарахад гарна. Гэтэл "сагсанд хийх" гэдэг үг болон сагсны зурган дээр дарахад ажиллахгүй
  }
});*/

/*elements.recipeDiv.addEventListener("click", (e) => {
  //`.recipe__btn,.recipe__btn *`==> .recipe__btn болон түүн доторх бусад элементүүд
  if (e.target.matches(`.recipe__btn,.recipe__btn *`)) {
    console.log(`button....`); //Одоо товчин дээр болон "САГСАНД ХИЙХ" тескт, сагсны зурган дээр дарах click-ийг барьж авч чадна.
  }
});*/

/*********************************************************************
 * *******************************************************************/
const controlList = () => {
  //124_15.00: Голын UI дээр хэвлэгдсэн байгаа detailed жор маань state.recipe дотор хадгалагдсан бгаа. Тэгвэл одоо энэ найрлагаа model фолдерт бгаа List модел руугаа хийж өгөх ёстой. Үүний тулд List f хэрэгтэй бно.

  // 1) Найрлаганы моделийг үүсгэнэ
  state.list = new List();
  //window.tt = state.list; //125_20.00: Моделоос устсан эсэхийг шалгахын тулд түр зуур. Өх, tt дотор юу юу байгааг харах гээд бгаа юм

  //"МИНИЙ САГС" дэлгэцэнд өмнө харагдаж бсан найрлагуудыг арилгах
  listView.clearItems();

  // 2) Уг модел руу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
  //state.recipe.ingredients.forEach((n) => state.List.addItem(n));
  state.recipe.ingredients.forEach((n) => {
    //Тухайн найрлагыг модел рүү хийнэ. Заавал хийгээд бгаа нь ард нь зарим найрлагыг устгахад ашиглана.
    //state.List.addItem(n); //124
    const item = state.list.addItem(n); //125_08.55: Буцаагаад item-d өгье. Тэрийгээ доор бгаа f-руу дамжуулья. Одоо тэгвэл addItem-ийг өөрчлөх ёстой.

    //console.log(`---${n}`);
    listView.renderItem(item); //124_20.58: listView дээр дотор нь rednderItem гэдэг f-г экспортлоод гаргачихсан бгаа. Энэ рүү n гэдэг найрлагыг бас "МИНИЙ САГС" дэлгэцэнд үзүүл гээд хэлчиж бна.
  });
};
/** 126_03.12:  * Like controller */

/*********************************************************************
 * *******************************************************************/
const controlLike = () => {
  //console.log("clicked...");
  // 1) Лайкийн моделийг үүсгэнэ.
  //126_21.40 if(state.liked) Хэрэв манай likes маань хов хоосон if (!state.likes) байхын бол шинээр үүсгэ, хоосон биш if (state.likes) байвал шинээр үүсгэхгүй.
  // state.likes = new Like();
  if (!state.likes) state.likes = new Like();

  // 2) Одоо харагдаж бгаа жорын ID-ийг олж авах
  const currentRecipeId = state.recipe.id;
  // 3) Энэ жорыг лайкласан эсэхийг шалгах
  //216_14.20:
  if (state.likes.isLiked(currentRecipeId)) {
    // Лайкалсан бол лайкыг нь болиулна
    //console.log("liked");
    state.likes.deleteLike(currentRecipeId);
    //console.log(state.likes);

    //Лайкын favourite heart цэснээс утсгана
    likesView.deleteLike(currentRecipeId);

    //Лайк товчны лайкалсан байдлыг болиулах
    likesView.toggleLikeBtn(false);
  } else {
    // Лайклаагүй бол лайклана
    //console.log("Not yet liked");
    //127_23.34: addLike дээр return хийсэн утгыг энд хүлээж авья!
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.img_url
    );
    //console.log(state.likes);
    //127_22.48: Лайк цэсэнд энэ лайкыг оруулах
    likesView.renderLike(newLike);

    //Лайк товчийг лайкалсан болгох
    likesView.toggleLikeBtn(true);
  }
  //127_19.33:
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  //`.recipe__btn,.recipe__btn *`==> .recipe__btn болон түүн доторх бусад элементүүд
  if (e.target.matches(`.recipe__btn,.recipe__btn *`)) {
    controlList();
  } else if (e.target.matches(`.recipe__love,.recipe__love *`)) {
    controlLike();
  } //126_02.18
});

//125_06.35:
/*elements.shoppingList.addEventListener("click", (e) => {
  //  console.log("clicked...");
  //125_11.18: closest ni ".shopping__item" classтай хамгийн ойрхон юу бна Тэрийг нь надад өгөөдөх гэсэн f
  const obj = e.target.closest(".shopping__item");
  console.log(obj); //shopping__item-тай li-г өгч бна: <li class ="shopping__item" data-itemid="kk0ch5re"></li>
  console.log(obj.dataset.itemid);
});*/

//125_14.37: Кодоо өшөө богино болгое!
elements.shoppingList.addEventListener("click", (e) => {
  //Клик хийсэн li элементийн data-itemid аттрибутыг шүүж гаргаж авах
  const id = e.target.closest(".shopping__item").dataset.itemid;
  //Олдсон ID-тай орцыг моделоос устгана.
  state.list.deleteItem(id);
  // Дэлгэцээс ийм ID-тай орцыг олж бас устгана.
  listView.deleteItem(id);
});
