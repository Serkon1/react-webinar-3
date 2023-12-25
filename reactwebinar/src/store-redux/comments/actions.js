import listToTree from "../../utils/list-to-tree";
import addCommentToTree from "../../utils/add-comment-to-tree";

export default  {
  /**
   * Загрузка комментариев к товару
   * @param _id {String}
   * @return {Function}
   */
  load: (_id) => {
    return async (dispatch, getState, services) => {


      // Сброс текущих комментариев и старт загрузки новых
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${_id}`
        });

        if (res.data.error) {
          dispatch({type: 'comments/load-error', payload: {error: res.data.error}});
        } else {
          // Комментарии загружены успешно
          dispatch({type: 'comments/load-success', payload: {
              comments: listToTree(res.data.result.items, _id),
              count: res.data.result.count
            }});
        }

      } catch (e) {
        //Ошибка загрузки
        console.error(e)
        dispatch({type: 'comments/load-error', payload: {error: e.message}});
      }
    }
  },

  /**
   * Отправка комментария на сервер
   * @param _id {String}
   * @param text {String}
   * @param _type {String}
   * @return {Function}
   */

  sendAnswer: (_id, text, _type) => {
    /*
    * Я подумал, что можно было бы сразу отображать полученный комментарий, для улучшения отзывчивости,
    * сначала я хотел подгружать комментарии с сервера после отправки своего, но на страницах, где комментариев много
    * загрузка была бы слишком долгой, поэтому я реализовал это просто с помощью функции, которая проходится по комментариям,
    * находя родительский и помещая новый комментарий в поле children
    * у родительского комментария, или если комментарий оставлен на товар, то функция просто добавит его в массив комментариев
  */
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-send-comment'});
      try {
        const newText = text.trim()

        if(newText !== '') {
          const res = await services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            body: JSON.stringify({
              text,
              parent: {_id, _type}
            })
          });

          if (res.data.error) {
            dispatch({type: 'comments/load-error', payload: {error: res.data.error}});
          } else {
            /*
              * Так как с сервера приходит коментарий без поля 'author: {profile: name: 'User'}',
              * можно подставить значение имени из текущего имени пользователя, так как комментарий оставляет текущий пользователь
              * так же необходимо установить значение child, чтобы не было ошибки при переборке дерева не словить ошибку
            */
            const newComment = {
              ...res.data.result,
              author: {
                _id: res.data.result.author.id,
                profile: {name: services._store.state.session.user.profile.name}
              },
              children: []
            }
            /*Создаем копию массива комментариев*/
            const cloneComments = JSON.parse(JSON.stringify(getState().comments.comments));
            /*Получаем id выбранного товара*/
            const articleId = getState().article.data._id
            //С помощью addCommentToTree добавляем комментарий в массив
            const comments = addCommentToTree(cloneComments, newComment, articleId)
            //Значение количества, будет равно текущему + 1, так как мы добавляем 1 комментарий
            const count = getState().comments.count + 1

            dispatch({type: 'comments/load-success', payload: {
                //Устанавливаем новый массив комментариев
                comments,
                //Устанавливаем новое значение count
                count
              }})
          }
        } else {
          dispatch({type: 'comments/empty-comment'});
          alert('Пустой комментарий, пожалуйста введите любый текст чтобы отправить комментарий')
        }

      } catch (e) {
        console.error(e)
        dispatch({type: 'comments/load-error', payload: {error: e.message}});
      }
    }
  },
}

