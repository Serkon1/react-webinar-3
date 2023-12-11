import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationControlPanel from "../../components/pagination-control-panel";
import PageLayout from "../../components/page-layout";
import ControlPanel from "../../components/control-panel";
import {useHref, useNavigate} from "react-router-dom";
import useLang from "../../store/use-lang";

function Main() {

  const history = useHref();
  const page = Number(history.replace(/\//g, ''));

  const {transfer, lang} = useLang()

  const store = useStore();
  const navigate = useNavigate()


  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    maxPage: state.catalog.maxPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
    activeModal: state.modals.name
  }));

  useEffect(() => {
    if(!page) {
      navigate('/1')
      return
    }
    store.actions.catalog.load(page - 1, 10)
  }, [history]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
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

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} transfer={transfer.Item}/>
    }, [callbacks.addToBasket, lang]),
  };

  return (
    <PageLayout
      head={transfer.head}
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
      <List list={select.list} renderItem={renders.item}/>
      <PaginationControlPanel
        currentPage={select.currentPage + 1}
        maxPage={select.maxPage}
        changePagination={callbacks.changePagination}
      />
    </PageLayout>
  );
}

export default memo(Main);
