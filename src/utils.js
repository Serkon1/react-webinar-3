const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Функция для проверки числа, на необходимость постановки необходимой буквы в конце слова
 */
export function substitutionInWordOnce(number, string) {
  const stringNum = number.toString();
  const lastDigit = stringNum.slice(-1);
  const lastTwoDigitNumber = stringNum.slice(-2);

  if
  (
      lastDigit > 1
      && lastDigit < 5
      && (lastTwoDigitNumber > 20 || lastTwoDigitNumber < 10)
  ) return string

  return ''
}

export function checkingArrayAndCreatingValue(array) {
  if(array.length === 0) return 0
  const massiveValueCode = array.map(el => {
    return el.code
  })
  return Math.max(...massiveValueCode)
}