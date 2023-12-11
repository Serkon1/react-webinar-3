import React, {memo, useCallback, useEffect} from 'react';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import {useHref, useLocation} from "react-router-dom";
import Product from "../../components/product";
import Head from "../../components/head";
import ControlPanel from "../../components/control-panel";
import PageLayout from "../../components/page-layout";
import useLang from "../../store/use-lang";
function ProductPage() {
  const store = useStore()

  const history = useHref()
  const page = history.slice(9);

  const {transfer, lang} = useLang()

  useEffect(() => {
    store.actions.product.getProduct(page)
  }, [history, store]);

  const select = useSelector( state => ({
    _id: state.product._id,
    title: state.product.title,
    description: state.product.description,
    madeIn: state.product.madeIn,
    category: state.product.category,
    edition: state.product.edition,
    price: state.product.price,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
    activeModal: state.modals.name
  }));

  const callbacks = {
    addToBasket: useCallback(() => {
      store.actions.basket.addToBasket(select._id)
    }, [select._id]),
    changePagination: useCallback(async (page = select.currentPage) => {
      if(page === '...' || !page) return;
      await store.actions.catalog.load(page - 1, 10)
    }, [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Очистка состояния продукта
    cleaningProduct: useCallback(() => {
      store.actions.product.cleaningProduct()
    }, [store, history]),
    // Переключение языка
    switchLang: useCallback((lang) => {
      store.actions.language.switchLanguage(lang)
    }, [store]),
  }

    return (
        <PageLayout
          head={select.title}
          activeModal={select.activeModal}
        >
          <ControlPanel
            openModalBasket={callbacks.openModalBasket}
            cleaningProduct={callbacks.cleaningProduct}
            switchLang={callbacks.switchLang}
            amount={select.amount}
            sum={select.sum}
            currentPage={select.currentPage}
            language={select.language}
            transfer={transfer.controlPanel}
          />
          <Product
            description={select.description}
            madeIn={select.madeIn}
            category={select.category}
            edition={select.edition}
            price={select.price}
            addToBasket={callbacks.addToBasket}
            transfer={transfer.Product}
          />
        </PageLayout>
    );
}

export default memo(ProductPage);