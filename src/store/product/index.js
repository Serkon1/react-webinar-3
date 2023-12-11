import StoreModule from "../module";
import Error from "../../app/error";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      _id: '',
      title: '',
      description: '',
      madeIn: '',
      category: '',
      edition: 0,
      price: 0
    }
  }

  /**
   * Получение товара
   * @param id {string}
   */
  async getProduct(id) {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
      const json = await response.json();
      this.setState({
        ...this.getState(),
        _id : json.result._id,
        title: json.result.title,
        description: json.result.description,
        madeIn: json.result.madeIn.title,
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price
      })
  }

  /**
   * Очищение товара
   */
  cleaningProduct() {
    this.setState({
      title: '',
      description: '',
      madeIn: '',
      category: '',
      edition: 0,
      price: 0
    })
  }
}

export default Product;
