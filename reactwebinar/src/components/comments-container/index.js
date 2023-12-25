import React, {memo, useCallback, useRef} from 'react';
import CommentsList from "../comments-list";
import './style.css';
import PropTypes from "prop-types";

/**
 * Рендер коментариев.
 * @param props.answerComment {Function} Выделения определенного комментария.
 * @param props.commentWaiting {Boolean} Ожидание.
 * @param props.commentsValue {Number} Количество комментариев.
 * @param props.inputAnswer {Function} Функция для рендера поля ввода.
 * @param props.articleId {String} id Товара.
 * @param props.children {React.ReactElement} дети
 * @param props.t {Function} перевод
 * @returns {React.ReactElement} Контейнер для комментариев
 */
function CommentContainer(props) {

  const selectButton = useCallback((e) => {
    if (e.target.className === 'Comment-button') {
      props.answerComment(e.target.id);
    }
  }, [props.answerComment]);

  return (
    <div className={'Comments-container'}>
      <div className="Comments-title">
        {props.commentWaiting
          ? `${props.t("comments.comments")} (${props.t("comments.loading")}...)`
          : `${props.t("comments.plural", props.commentsValue)} (${props.commentsValue})`}
      </div>
      <div className="Comments-container_list" onClick={selectButton}>
        {props.children}
      </div>
      {props.currentAnswer === '' && props.inputAnswer(props.articleId, true)}
    </div>
  );
}

Comment.propTypes = {
  answerComment: PropTypes.func,
  commentWaiting: PropTypes.bool,
  commentsValue: PropTypes.number,
  articleId: PropTypes.string,
  inputAnswer: PropTypes.func
};

Comment.defaultProps = {
  answerComment: () => {},
  inputAnswer: () => {}
}

export default memo(CommentContainer);