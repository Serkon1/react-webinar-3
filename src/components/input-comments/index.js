import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import './style.css'

/**
 * Input для комментариев
 * @param props.currentId {String} Текущий id товара.
 * @param props.cancelAnswer {Function} Отмена выбора input.
 * @param props.sendAnswer {Function} Отправка комментария.
 * @param props.exists {Boolean} Авторизация.
 * @param props.rootComment {Boolean} Является ли данный input корневым или же это ответ к комментарию.
 * @param props.waiting {Boolean} Значение загрузки.
 * @param props.onSignIn {Function} Функция redirect.
 * @param props.t {Function} Перевод

 * @returns {React.ReactElement} Поле ввода
 */

function InputComments(props) {
  const [value, setValue] = useState('');

  const callbacks = {
    onSignIn: useCallback(() => {
      if (!props.waiting) props.onSignIn();
    }, [props.waiting]),
    onChange: useCallback((event) => {
      if (!props.waiting) setValue(event.target.value);
    }, [props.waiting]),
    onClickSend: useCallback(() => {
      if (!props.waiting) {
        const parentType = props.rootComment ? "article" : "comment";
        props.sendAnswer(props.currentId, value, parentType);
      }
    }, [props.waiting, props.currentId, props.rootComment, value]),
    cancelAnswer: useCallback(() => {
      if (!props.waiting) props.cancelAnswer();
    }, [props.waiting]),
  };

  return (
    <div className={props.rootComment ? 'Input-container root' : 'Input-container'}>
      {!props.exists
        ? <div className={'Input-login'} id={'input-' + props.currentId}>
            <span onClick={callbacks.onSignIn}
                  className={'Input-login_link'}>
              {props.t("comment.login.sign")}
            </span>
            {props.rootComment ? props.t("comment.login.comment") : props.t("comment.login.answer")}
            {
              !props.rootComment
              ? (
                <span
                  className={'Input-login_cancel'}
                  onClick={callbacks.cancelAnswer}>
                    {props.t("comment.login.cancel")}
                </span>
                )
              : <></>
            }
          </div>
        : (
          <div className={'Input-field'}>
            <div className="Input-title">
              {props.rootComment ? props.t("comment.input.comment") : props.t("comment.input.answer")}
            </div>
            <textarea
              className={'Input-comment'}
              value={value}
              type={'text'}
              onChange={callbacks.onChange}
              id={'input-' + props.currentId}
            />
            <div className="Input-button_container">
              <button
                className="Input-send"
                onClick={e => callbacks.onClickSend(props.currentId, value, props.rootComment)}>
                {props.t("comment.input.send")}
              </button>
              {
                props.rootComment
                  ? <></>
                  : (
                    <button onClick={callbacks.cancelAnswer}
                      className="Input-cancel">
                      {props.t("comment.input.cancel")}
                    </button>
                  )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default memo(InputComments);