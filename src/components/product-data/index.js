import React from 'react'
import { cn as bem, cn } from '@bem-react/classname';
import propTypes from "prop-types";
import './index.css';

export default function ProductData({ data, onAddItem }) {
  const cn = bem('product-data');
  return (
    <div className={cn()}>
      <p className={cn('description')}>{data.description}</p>
      <p className={cn('country')}>
        Страна производитель: <span className={cn('country-value')}>{data.country}</span>
      </p>
      <p className={cn('category')}>
        Категория: <span className={cn('category-value')}>{data.category}</span>
      </p>
      <p className={cn('year')}>
        Год выпуска: <span className={cn('year-value')}>{data.year}</span>
      </p>
      <p className={cn('price')}>
        Цена: <span className={cn('price-value')}>{data.price}</span>
      </p>
      <button className={cn('button')} onClick={onAddItem}>Добавить</button>
    </div >
  )
}

ProductData.propTypes = {
  data: propTypes.shape({
    _id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    title: propTypes.string,
    price: propTypes.number,
    description: propTypes.string,
    country: propTypes.string,
    category: propTypes.string,
    year: propTypes.number
  })


}