
/**
 * @typedef {Object} Comment
 * @property {Object} author - Автор поста
 * @property {Array.<Comment>} children - Поле с детьми
 * @property {String} [dateCreate] - Необязательное поле с датой
 * @property {Boolean} [isDeleted] - Необязательное поле идентифекатором удаления
 * @property {Object} parent - Родитель
 * @property {String} text - Текст комментария
 * @property {String} _id - Id комментария
 */
/**
 * Добавление комментария в список и возращение нового массива комментариев.
 * @param commentsTree {Array} лист комментариев.
 * @param newComment {Object<Comment>} Новый комментарий.
 * @param articleId {String} Id товара.
 * @returns {Array<Comment>} Корневые узлы
 */
export default function addCommentToTree(commentsTree, newComment, articleId) {
  let queue = [...commentsTree]; // используем очередь для хранения узлов дерева
  let node;
  /*
    Если у нас нет дерева, или его длина 0, или если новый комментарий, пишется к товару, а не к комментарию
    тогда просто разворачиваем дерево и пушим в него новый элемент
  * */
  if(!commentsTree || commentsTree.length === 0 || newComment.parent._id === articleId) {
    return [...commentsTree, newComment];
  }
  while (queue.length > 0) {
    node = queue.shift(); // извлекаем первый узел из очереди
    if (node._id === newComment.parent._id) {
      // Добавляем новый комментарий в поле children родителя
      node.children.push(newComment);
      return commentsTree;
    } else {
      // Добавляем всех дочерних узлов в очередь для последующей обработки
      queue.push(...node.children);
    }
  }
}