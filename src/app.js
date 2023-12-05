import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store, cartItems }) {

  const [isCartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
      setCount(cartItems.getState().list.length);
      setTotal(cartItems.findTotal());
    }, [store, cartItems]),

    onAdd: useCallback((item) => {
      cartItems.addItem(item)
      setCount(cartItems.getState().list.length);
      setTotal(cartItems.findTotal());
    }, [cartItems]),

    onCartOpen: useCallback(() => {
      setCartOpen(true);
      setCount(cartItems.getState().list.length);
      setTotal(cartItems.findTotal());
    }, [cartItems]),

    onCartClose: useCallback(() => {
      setCartOpen(false);
      setCount(cartItems.getState().list.length)
      setTotal(cartItems.findTotal());
    }, [cartItems]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Cart
        store={cartItems}
        isCartOpen={isCartOpen}
        onCartClose={callbacks.onCartClose}
        isCartItem={true}
      />
      <Controls
        count={count}
        total={total}
        onCartOpen={callbacks.onCartOpen}
      />
      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        isCartItem={false}
        onAdd={callbacks.onAdd}
      />
    </PageLayout>
  );
}

export default App;
