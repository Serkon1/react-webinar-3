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
 * Заполнение массива, для последуещего рендеринга пагинации
 * @param currentPage {Number}
 * @param maxPage {Number}
 * @returns {Array}
 */
export function fillingListPagination (currentPage, maxPage) {
  const renderButton = []
  for (let i = 1; i <= maxPage; i++) {
    if(currentPage === 1) {
      if(i > 1 && i < 4 || i === 1) {
        renderButton.push({value: i, code: i})
      } else if(i === 4) {
        renderButton.push({value: '...', code: i})
      }
      if(i === maxPage) {
        renderButton.push({value: i, code: i})
      }
      continue;
    }
    if(currentPage === maxPage) {
      if(i < maxPage && i > maxPage - 3 || i === maxPage) {
        renderButton.push({value: i, code: i})
      } else if(i === maxPage - 3) {
        renderButton.push({value: '...', code: i})
      }
      if(i === 1) {
        renderButton.push({value: i, code: i})
      }
      continue;
    }

    if(i === currentPage || i === currentPage + 1 || i === currentPage - 1) {
      renderButton.push({value: i, code: i})
      continue

    }
    if(currentPage === 3 && i === 1 || currentPage === maxPage - 2 && i === maxPage) {
      renderButton.push({value: i, code: i})
      continue
    }
    if(i === currentPage + 2 || i === currentPage - 2) {
      renderButton.push({value: '...', code: i})
    }
    if(i === maxPage || i === 1) {
      renderButton.push({value: i, code: i})
    }
  }
  return renderButton;
}