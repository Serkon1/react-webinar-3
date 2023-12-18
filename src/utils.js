/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Обьект категории
 * @typedef {{Object: {title, value}}} Category
 * @property {String} title - Значение для опции категорий
 * @property {String} value - Значение _id для запросов на сервер
 */

/**
 * Функция для разввертования массива категории с сохранением вложености
 * @param input {Array}
 * @param parent {Object}
 * @param prevTitle {String}
 * @returns {Array<Category>}
 */
export function flattenArray(input, parent, prevTitle = '') {
  const result = [];
  input.forEach(item => {
    if (parent && item.parent && item.parent._id === parent._id) {
      result.push({ title: prevTitle + item.title, value: item._id });
      result.push(...flattenArray(input, item, prevTitle + '- '));
    }
  });
  return result;
}
/**
 * Функция заполнения массива категорий, сохраняет только необходимые поля title и value, для последующий передачт в select
 * @param array {Array}
 * @returns {Array<Category>}
 */
export function fillingCategoryArray (array) {
  //Добавляем свойство Все для его выбора
  const result = [{ title: 'Все', value: '' }]
  /*Заполняем результирующий массив с помощью функции reduce проходимся по всем элементам, если у элемента нет родителя
  * То добавляем текущий элемент, а после чего с помощью функции flattenArray находим все дочерние элементы
  * учитывая вложенность и разварачиваем полученный массив в результирующий
  * */
  result.push(...array.reduce((res, item) => {
    if (!item.parent) {
      res.push({ title: item.title, value: item._id });
      res.push(...flattenArray(array, item, '- '));
    }
    return res;
  }, []))
  return result;
}

