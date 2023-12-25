// Начальное состояние
export const initialState = {
  comments: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
  error: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-send-comment":
      return {...state, waiting: true}

    case "comments/load-start":
      return {...state, comments: [], count: 0, waiting: true};

    case "comments/load-success":
      return {...state, comments: action.payload.comments, count: action.payload.count, waiting: false};

    case "comments/empty-comment":
      return {...state, waiting: false}

    case "comments/load-error":
      return {...state, comments: [], count: 0, waiting: false, error: action.payload.error};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;