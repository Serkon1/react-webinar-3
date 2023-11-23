/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  uniqCode = null;

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
      if (this.uniqCode === null) {
          this.uniqCode = this.state.list[this.state.list.length - 1].code + 1
      } else {
          this.uniqCode = this.uniqCode[0] + 1
      }
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.uniqCode, title: 'Новая запись', count: 0}]
    })
      this.uniqCode = null
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
      if (this.state.list[this.state.list.length - 1].code === code && this.uniqCode === null) {
          this.uniqCode = [code]
      } else if (this.state.list[this.state.list.length - 1].code === code || this.uniqCode != null) {
          this.uniqCode = [...this.uniqCode, code]
      }  else (
          this.uniqCode = null
      )
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
            !item.selected ? item.count += 1 : item.count
          item.selected = !item.selected;
        } else {
            item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
