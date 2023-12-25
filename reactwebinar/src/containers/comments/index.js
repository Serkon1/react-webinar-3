import React, {useCallback, useEffect, useState} from 'react';
import useInit from "../../hooks/use-init";
import commentsAction from "../../store-redux/comments/actions";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";
import dateFormat from "../../utils/date-format";
import Spinner from "../../components/spinner";
import CommentContainer from "../../components/comments-container";
import InputComments from "../../components/input-comments";
import useSelector from "../../hooks/use-selector";
import CommentsList from "../../components/comments-list";
import useTranslate from "../../hooks/use-translate";
import {element} from "prop-types";

function Comments() {
  const params = useParams();
  const {t, lang} = useTranslate()

  useInit(() => {
    //Загрузка комментариев к товару
    dispatch(commentsAction.load(params.id));
  }, [params.id]);

  //Состояние, с помощью этого состояния отрисовывается input в зависимости от id
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentAnswer , setCurrentAnswer] = useState('')
  const [input, setInput] = useState(null)

  const select = useSelectorRedux(state => {
    return {
      comments: state.comments.comments,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }}, shallowequal);

  //Необходимо получить состояние авторизации
  const exists = useSelector(state => state.session.exists)
  const userName = useSelector(state => state.session.user.profile?.name)


  const callbacks = {
    //Перенаправление на страницу авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    //Перенаправление на страницу профиля, если имя совпадает
    onRedirectProfile: useCallback(() => {
      if (exists) navigate('/profile');
    }, [location.pathname, exists]),
    //Выделение определенного input
    answerComment: useCallback((id) => {
      setCurrentAnswer(id);
      //Скролл будет вызываться по клику, только если два раза кликнуть на один и тот же ответ, в
      //остальных случаях при смене currentAnswer будет срабатывать useEffect, который вызывет скролл к текущему элементу
      if(currentAnswer === id) callbacks.scrollToInput(input)
    }, [currentAnswer, input]),
    //Отмена выделения input
    cancelAnswer: useCallback(() => {
      setCurrentAnswer('')
    }, []),
    //Отправка комментария
    sendAnswer: useCallback((id, text, parentType) => {
      dispatch(commentsAction.sendAnswer(id, text, parentType))
    }, []),
    scrollToInput: useCallback((input) => {
      const rect = input.getBoundingClientRect()
      //Проверяем поле видимости и не является ли данный input корневым
      if(
        !(rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) &&
        currentAnswer !== ''
      ) {
        input.scrollIntoView({ block: "center", behavior: "smooth" });
        setTimeout(() => {
          input?.focus()
        }, 1000)
      }
    }, [input, currentAnswer])
  }

  useEffect(() => {
    const currentInput = document.getElementById(`input-${currentAnswer || params.id}`)
    callbacks.scrollToInput(currentInput)
    setInput(currentInput)
  }, [currentAnswer])

  const renders = {
    //Создание комментария
    comment: useCallback((item, level) => (
      <Comment
        user={item.author.profile.name}
        date={dateFormat(item.dateCreate, lang)}
        text={item.text} id={item._id}
        level={level}
        children={item.children}
        currentUserName={userName}
        onRedirectProfile={callbacks.onRedirectProfile}
        exists={exists}
        t={t}
      />
    ), [select.comments, exists, lang]),
    //Создание поля ввода
    inputComments: useCallback((id, rootComment = false) => {
      return (
        <InputComments
          currentId={id}
          cancelAnswer={callbacks.cancelAnswer}
          sendAnswer={callbacks.sendAnswer}
          exists={exists}
          rootComment={rootComment}
          waiting={select.waiting}
          onSignIn={callbacks.onSignIn}
          t={t}
        />)
      }
    , [exists, select.waiting, lang, currentAnswer])
  };

  return (
    //Пока идет загрузка комментариев, будет отображаться спинер
    <Spinner active={select.waiting}>
      <CommentContainer
        commentsValue={select.count}
        commentWaiting={select.waiting}
        answerComment={callbacks.answerComment}
        currentAnswer={currentAnswer}
        inputAnswer={renders.inputComments}
        articleId={params.id}
        t={t}>
        <CommentsList
          commentRender={renders.comment}
          commentsList={select.comments}
          inputAnswer={renders.inputComments}
          currentAnswer={currentAnswer}
          exists={exists}
          lang={lang}
          t={t}
        />
      </CommentContainer>
    </Spinner>
  );
}

export default Comments;