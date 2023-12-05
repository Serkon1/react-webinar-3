import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('Item')

function Item(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item);
    },
  }

  return (
    <div className={cn()}>
      <div className={cn(`code`)}>{
        props.item.code
      }</div>
      <div className={cn(`title`)}>
        {props.item.title}
      </div>
      <div className={cn(`price`)}>
        {Intl.NumberFormat("ru-RU", {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
        }).format(props.item.price)}
      </div>
      {
        props.isCartItem
          ? <p className={cn(`quantity`)}>{props.item.quantity} шт</p>
          : ``
      }
      <div className={cn(`actions`)}>
        <button className={`${cn('button')} button`} onClick={
          props.isCartItem
            ? callbacks.onDelete
            : callbacks.onAdd
        }>
          {
            props.isCartItem
              ? 'Удалить'
              : 'Добавить'
          }
        </button>
      </div>
    </div >
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    quantity: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  isCartItem: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => { },
  onAdd: () => { }
}

export default React.memo(Item);
