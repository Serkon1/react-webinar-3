import * as translations from './translations';

class I18nService {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config
    this.lang = 'ru'
    this.listeners = [];
  }

  /**
   * Установка языка, а так же вызов слушателей
   * */
  setState(lang) {
    this.lang = lang
    this.listeners.forEach(listener => listener(this.lang));
  }

  /**
   * Добавление слушателей, срабатывают при изменении в state
   * @param {Function} listener - функция которая будет вызываться
   * */
  addListener(listener) {
    this.listeners.push(listener);
  }

  /**
   * Удаление слушателей
   * @param {Function} listener - функция которая будет вызываться
   * */
  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Функция для смены языка принимает значение нового языка в формате: 'ru'
   * @param {String} lang
   * */

  /*
  * Я решил, что сервис API, сосредоточен на отправке запросов и изменении дефолтных параметров к запросам, таких как
  * заголовки и т.д, так как я имею прямой доступ к сервису, я могу изменять заголовки запроса из этого класса.
  * А в компонентах, которые имеют мультиязычность на сервере вызывается перезагрузка данных при изменении языка.
  * Наблюдение за текущим языком реализовано в useTranslate
  * */
  switchLang = (lang) => {
    if(lang === this.lang) return
    switch (lang) {
      case 'ru':
        this.setState(lang)
        this.services.api.setHeader('Accept-Language', lang)
        return;
      case 'en':
        this.setState(lang)
        this.services.api.setHeader('Accept-Language', lang)
        return;
      default:
        console.error('Передан некорректный код языка I18n, укажите один из следующих: \'ru\' \'en\'')
        return;
    }
  }

  /**
   * Функция перевода и плюрализации
   * @param {String} text необходимая строка
   * @param {Number} plural количество
   * @param {String} lang язык перевода
   * @return {String}
   * */
  translate(text, plural, lang) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

}

export default I18nService;