const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function randomcode(){
  let max = 999999
  let min = 0
  return (Math.floor(Math.random() * (max - min)) + min)
  }

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

export function setNumber(number) {
    let s = number % 10;
    let b = number % 100;

    if (b > 10 && b < 20 || s == 1) {
        return 'раз';
    } else if (s > 1 && s < 5) {
        return 'раза';
    } else {
        return 'раз';
    }
}