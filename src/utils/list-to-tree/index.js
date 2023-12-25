/**
 * Преобразование списка в иерархию, при указании rootId не будет создаваться родительский элемент
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @param rootId {String} Id ключевого компонента
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, rootId = null, key = '_id') {
  const newList = JSON.parse(JSON.stringify(list))
  let trees = {};
  let roots = {};
  for (const item of newList) {

    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиненные родителя и если он не равен rootId
    if (item.parent?.[key] && item.parent[key] !== rootId) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent[key]]) {
        trees[item.parent[key]] = {children: []};
        roots[item.parent[key]] = trees[item.parent[key]]
      }
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }

  return Object.values(roots);
}
