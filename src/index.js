import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, randomcode} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: randomcode(), title: 'Название элемента', count: 0},
    {code: randomcode(), title: 'Некий объект', count: 0},
    {code: randomcode(), title: 'Заголовок', count: 0},
    {code: randomcode(), title: 'Очень длинное название элемента из семи слов', count: 0},
    {code: randomcode(), title: 'Запись', count: 0},
    {code: randomcode(), title: 'Шестая запись', count: 0},
    {code: randomcode(), title: 'Седьмая запись', count: 0},
  ]
});



const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
    // console.log(store.state.list)
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
