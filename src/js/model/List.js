//124_05.25: Миний сагс моделийг үүсгэх: Голын /UI/ лист доторх "Сагсанд хийх" товчийг дарахад баруун талын "МИНИЙ САГС" листэнд бичигдэх
/*Export default class list {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
}*/

//125_03.50:
import uniqid from "uniqid";

export default class list {
  constructor() {
    this.items = [];
  }

  //125_15.50:
  deleteItem(id) {
    // 1) id гэдэг ID-тэй орцын индексийг массиваас хайж олно
    //125_17.40: Энэ массивын el.id ID нь манай дамжуулсан ID-тай тэнцүү бгаа эсэхийг шалгаад тэнцүү бвал index-руу утгыг нь өгнө
    const index = this.items.findIndex((el) => el.id === id);
    // 2) Уг индекс дээрх элементийг массиваас устгана.
    this.items.splice(index, 1);
  }
  addItem(item) {
    //125_09.27:
    let newItem = {
      id: uniqid(),
      //item: item, //Гаднаас ирэх item
      // item: item -ийг ES6 дээр item гэж товчилдаг!! NICE
      item,
    };
    this.items.push(newItem);
    return newItem;
  }
}
