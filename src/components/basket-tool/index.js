import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({amount, sum, openModalBasket, transfer}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{transfer.basket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: transfer.plural.one,
            few: transfer.plural.few,
            many: transfer.plural.many
          })} / ${numberFormat(sum)} ₽`
          : `${transfer.plural.empty}`
        }
      </span>
        <button onClick={openModalBasket} className={'Basket-button button'}>{transfer.button}</button>
    </div>
  );
}

export default memo(BasketTool);
