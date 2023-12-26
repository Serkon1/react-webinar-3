import React, {memo, useCallback, useMemo} from 'react';
import './style.css';
import PropTypes from "prop-types";
import treeToList from "../../utils/tree-to-list";

/**
 * Рендер коментариев.
 * @param props.commentsList {Array} Список комментариев.
 * @param props.commentRender {Function} Функция для рендера комментария.
 * @param props.inputAnswer {Function} Функция для рендера поля ввода.
 * @param props.currentAnswer {String} Текущий коментарий на который необходимо ответить.
 * @param props.exists {Boolean} Текущий коментарий на который необходимо ответить.
 * @returns {React.ReactElement} Список комментариев
 */
/*
    Рекурсвная функция, которая заполняет комментарии, учитывая уровень погружения, устанавлевает отступы
    в соответствии с макетом 30px
    Под каждый комментарий создается контейнер, в котором будут расположены отсальные комментарии и т.д., рекусивно
    в конце каждого блока есть проверка, если выбранный комментарий для ответа, равен текущему, то мы отрисовываем
    input.
    Из-за моей логики построения в данном случае не получится применить tree-to-list, так как она пушит просто в
    результирующий массив, тогда как здесь необходима вложенность элементов друг в друга
  */
function CommentsList(props) {
  const rendersNestedList = useCallback((list = props.commentsList, level = 0) => {
    return (
      <div className={'Comments-list_container'}>
        {list.length > 0 &&
          list.map((el, index) => (
            <div
              key={el._id}
              className={'Comment-list_item' + ((level === 0 && index === 0) ? ' first' : '')}
              style={{ marginLeft: `${level > 0 && level <= 5 ? '30px' : 0}` }}
            >
              {props.commentRender(el, level)}
              {(!el.children || el.children.length === 0) ? <></> : rendersNestedList(el.children, level + 1)}
              {props.currentAnswer === el._id && props.inputAnswer(el._id)}
            </div>
          ))}
      </div>
    );
  }, [props.commentsList, props.currentAnswer, props.commentRender, props.inputAnswer]);

  const memoizedList = useMemo(() => rendersNestedList(), [rendersNestedList]);

  return <>{memoizedList}</>;
}

Comment.propTypes = {
  commentsList: PropTypes.array,
  commentRender: PropTypes.func,
  inputAnswer: PropTypes.func,
  currentAnswer: PropTypes.string,
};

Comment.defaultProps = {
  commentsList: [],
  commentRender: () => {},
  inputAnswer: () => {},
}
export default memo(CommentsList);