import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useLang from "../../store/use-lang";

function Basket() {

  const store = useStore();

  const {transfer, lang} = useLang()

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),

    getProduct: useCallback((productId) => {
      store.actions.product.getProduct(productId)
      callbacks.closeModal()
    }, [store])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket
        item={item}
        onRemove={callbacks.removeFromBasket}
        getProduct={callbacks.getProduct}
        transfer={transfer.ItemBasket}
      />
    }, [callbacks.removeFromBasket, lang]),
  };

  return (
    <ModalLayout title={transfer.Basket.title} closeButtonText={transfer.Basket.button} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} cell={transfer.Basket.cell}/>
    </ModalLayout>
  );
}

export default memo(Basket);
