//124_18.27 Let's create listView.js

import { elements } from "./base";

export const renderItem = (item) => {
  const html = `
  <li class="shopping__item" data-itemid=${item.id}>
      <p class="shopping__description">${item.item}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
  </li>`;
  //124_26.05: "Миний сагсан"-д зөндөө олон жорууд орж ирнэ. Хамгийн дээр нь эхний оруулсан г.м ар араас нь жоруудыг оруулахын тулд хамгийн сүүлийн ul таг-ийн  өмнө нь нэмнэ гэсэн үг. Ө х, ul таг хаагдлаа. "ul" хХаагдсаны яг өмнө нь нэмнэ буюу beforeend
  elements.shoppingList.insertAdjacentHTML("beforeend", html);
};

//124_27.40: "САГСАНД ХИЙХ" товчийг дарах болгонд өөрийгээ цэвэрлэдэг байх ёстой
export const clearItems = () => {
  elements.shoppingList.innerHTML = "";
};

export const deleteItem = (id) => {
  // 1) ID-г хайж олно
  const item = document.querySelector(`[data-itemid="${id}"]`);
  //console.log(item);
  item.parentElement.removeChild(item);
  // 2) Хайж олсон ID-гаараа устгана
};
