import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count: 0
    }
  }

  async load(pageNum = 1) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${10 * (pageNum - 1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }

  // запрос по API отдельного товара
  async loadItemData(_id) {
    if (!_id) return {};
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);

    const json = await response.json();

    const result = {
      _id,
      description: json.result.description,
      title: json.result.title,
      country: json.result.madeIn.title,
      category: json.result.category.title,
      year: json.result.edition,
      price: json.result.price,
    }
    return result;
  }
}

export default Catalog;
