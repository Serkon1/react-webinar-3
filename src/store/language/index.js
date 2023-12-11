import StoreModule from "../module";
import ru from "./ru";
import en from "./en"

class Language extends StoreModule{
  initState() {
    return {
      value: 'ru',
      en: en,
      ru: ru
    }
  }

  /**
   * Переключение языка
   * @param lang {string}
   */
  switchLanguage(lang) {
    this.setState({
      ...this.getState(),
      value: lang
    })
  }

  getTransfer() {
    const currentLang = this.getState().value
    return this.getState()[currentLang]
  }
}

export default Language;