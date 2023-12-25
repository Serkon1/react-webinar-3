import React, {memo} from 'react';
import './style.css';
import List from "../list";
import PropTypes from "prop-types";

/**
 * Компонент комментария.
 * @param props.user {String} Имя пользователя, который оставил комментарий.
 * @param props.date {String} Дата в формате строки.
 * @param props.currentUserName {String} Текущее имя пользователя.
 * @param props.text {String} Текст комментария.
 * @param props.onRedirectProfile {Function} Функция редиректа.
 * @param props.exists {Boolean} Авторизация.
 * @param props.id {String} id для последуйщей передачи при навешивании на список слушателя события, можно будет доставать id из кнопки.
 * @returns {React.ReactElement} Контейнер для комментариев
 */
function Comment(props) {
  return (
    <div className={'Comment'}>
      <div className="Comment-title">
        <div
          onClick={e => {
            if (props.currentUserName === props.user) props.onRedirectProfile()
          }}
          className={"Comment-title_name" + ((props.currentUserName === props.user && props.exists) ? ' current' : '')}>
          {props.user}
        </div>
        <div className="Comment-title_date">
          {props.date}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <span
         className="Comment-button"
         id={props.id}
      >
        {props.t("comment.answer")}
      </span>
    </div>
  );
}

Comment.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
};
export default memo(Comment);