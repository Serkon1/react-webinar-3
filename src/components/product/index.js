import React, {memo} from 'react';
import './style.css'
import PropTypes from "prop-types";
function ProductPage({description, madeIn, category, edition, price, addToBasket, transfer}) {

  return (
    <div className={'Product'}>
      <div className="Product-description">
        {description}
      </div>
      <div className="Product-madeIn">
        {transfer.madeIn}: <b className={'strong'}>{madeIn}</b>
      </div>
      <div className="Product-category">
        {transfer.category}: <b className={'strong'}>{category}</b>
      </div>
      <div className="Product-edition">
        {transfer.edition}: <b className={'strong'}>{edition}</b>
      </div>
      <div className="Product-price strong">
        {transfer.price}: {price}
      </div>
      <button className="Product-button button" onClick={e => addToBasket()}>
        {transfer.button}
      </button>
    </div>
  );
}
ProductPage.propTypes = {
  description: PropTypes.string,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.number,
  price: PropTypes.number,
  addToBasket: PropTypes.func
};

export default memo(ProductPage);