import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useLoaderData } from 'react-router-dom';
import Basket from "../basket";
import { useNavigate } from "react-router-dom"

function Main() {
  const navigate = useNavigate();
  const activeModal = useSelector(state => state.modals.name);

  const loaderData = useLoaderData();
  const page = Number(loaderData.page) || 1;
  const store = loaderData.store;

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    navigate: useCallback((_id) => {
      navigate(`/products/${_id}`);
    }, []),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} onClick={callbacks.navigate} />
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
        <List list={select.list} renderItem={renders.item} />
        <Pagination totalPages={Math.ceil(Number(select.count) / 10)} currentPage={page} />
      </PageLayout>
      {activeModal === 'basket' && <Basket navigate={callbacks.navigate} />}
    </>
  );
}

export default memo(Main);
