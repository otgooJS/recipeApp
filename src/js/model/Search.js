require("@babel/polyfill");
import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async doSearch() {
    //try{}catch(){}
    try {
      let result = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );

      //const recipes = result.data.recipes;
      this.result = result.data.recipes; //Гарч ирсэн үр дүн дотроо хадгална. Энийг хийчихье!
      return this.result;
    } catch (error) {
      //alert(`Асуудал гарлаа: ${error}`);
      console.log("Асуудал гарлаа: " + error);
    }
  }
}
