//126_05.00: Let's create Like model file==> Like.js. Like model is very similar to List model.
export default class Likes {
  constructor() {
    this.readDataFromLocalStorage();
    //this.likes = [];
    //128_10.26: if this.likes hooson bval;
    if (!this.likes) this.likes = [];
  }
  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img }; //126_06.18: id:id, titile: title etc
    this.likes.push(like);
    //128_06.33_- Like нэмэгдэх болгонд үүнийг local storage-руу хадгална
    this.saveDataToLocalStorage(); //128_07.38: class dotroo yrd ni this geh yostoi.
    return like;
  }

  deleteLike(id) {
    // 1) id гэдэг ID-тэй LIKE-ийн индексийг массиваас хайж олно
    const index = this.likes.findIndex((el) => el.id === id);
    // 2) Уг индекс дээрх элементийг массиваас устгана.
    this.likes.splice(index, 1);

    //128_06.42_- Тухайн нэг Like-г устгах болгонд бас JSON string үүсгээд local storage-руу дарж хадгална
    this.saveDataToLocalStorage(); //have error when this is missed.
  }

  //126_07.32: Ямар нэг ID дамжуулагдахад энэ ID-тай жор like дарагдсан эсэхийг шалгах хэрэг гарна. Я.г Heart-рүү дамжуулах эсэхээ шийдэх ёстой. Хэрэв лайк-лагдсан бол "this.likes" гэдэг массив дотор л явж байгаа. Өх, id ID-тай index-ийг олоод тийм index байвал лайк-лагдсан бна гэсэн үг.
  // Манай модел дотор хадгалагдаж бвал isLiked f нь TRUE, үгүй бол FALSE буцаана.
  isLiked(id) {
    /* if (this.likes.findIndex((el) => el.id === id) === -1) return false;
    else return true;*/
    //126_09.03 Above code can be made shorter in shown below:
    return this.likes.findIndex((el) => el.id === id) !== -1; // got it!! Nice
  }

  //126_10.05: The function which says the total number of likes
  getNumberOfLikes() {
    return this.likes.length;
  }

  // 126_10.48: Одоо дээрх f-уудыг үндсэн controller-руугаа /index.js/  import-лж оруулж өгнө //

  /************************************* 128_04.50 ********************************** */
  //localStorage: -руу массивыг хийж болохгүй тул эхлээд заавал тэмдэгт мөр рүү хөврүүлэх ёстой.
  //JSON.stringify-массивыг JSON байдлаар тэмдэгт рүү хөрвүүлдэг.
  saveDataToLocalStorage() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  //128_09.01: localStorage дотор хадгалагдсан like-iig вэб дээрээ харуулах
  readDataFromLocalStorage() {
    //localStorage.getItem('likes') // JSON string bgaa.
    //Uuniig bytsaagaad JS object bolgoh yostoi. Yyniig  JSON.parse hiideg.
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
