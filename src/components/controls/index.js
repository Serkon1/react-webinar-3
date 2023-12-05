import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { plural } from "../../utils";

const cn = bem('Controls')

function Controls(props) {

  return (
    <div className={cn()}>
      <p className={cn(`title`)}> В корзине:
        {
          props.count === 0
            ? <span className={cn(`span`)}>пусто</span>
            : <span className={cn(`span`)}>
              {props.count} {plural(props.count, {
                one: 'товар',
                few: 'товара',
                many: 'товаров'
              })} / {Intl.NumberFormat("ru-RU",
                {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0,
                }).format(props.total)}
            </span>
        }

      </p>
      <button className={cn('button')} onClick={() => props.onCartOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onCartOpen: PropTypes.func.isRequired
};

Controls.defaultProps = {
  onCartOpen: () => { }
}

export default React.memo(Controls);
