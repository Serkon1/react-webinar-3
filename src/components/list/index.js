import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('List')

function List(props) {

  return (
    <div className={cn()}>{
      props.list.map(item =>
        <div key={item.code} className={cn(`item`)}>
          <Item
            item={item}
            onDelete={props.onDeleteItem}
            isCartItem={props.isCartItem}
            onAdd={props.onAdd}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  isCartItem: PropTypes.bool.isRequired,
  onAdd: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => { },
  onAdd: () => { }
}

export default React.memo(List);
