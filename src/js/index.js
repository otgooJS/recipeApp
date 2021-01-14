require("@babel/polyfill");
import Search from "./model/Search";

//04.55 Class-ийн Object-г үүсгэе!
let search = new Search("pasta");
search.doSearch().then((r) => console.log(r)); //06.36 async f-р буцаагдсан утгууд promise-р дамжиж ирдэг тул авахдаа promise-н then-р /амлалт биелэсэн бол/ дамжуулж авна.
