import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 0,
      maxPage: 0
    }
  }

  async load(page = 0, limit = 10) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${page*limit}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      currentPage: page,
      maxPage: Math.ceil(json.result.count / limit)
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
