import StoreModule from "../module";
import {fillingCategoryArray} from "../../utils";

class Categories extends StoreModule {
  initState() {
    return {
      categoriesTest: []
    }
  }

  /**
   * Получение списка категорий и установка в стейт связанного массива
   */
  async setCategory() {
    try {
      const categoryURL = '/api/v1/categories?fields=_id,title,parent(_id)&limit=*'

      const response = await fetch(categoryURL)
      const json = await response.json();
      const result = json.result.items

      const flattenedArray = fillingCategoryArray(result)

      this.setState({
        ...this.getState(),
        categoriesTest: flattenedArray
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export default Categories;
