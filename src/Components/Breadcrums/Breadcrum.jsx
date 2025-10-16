import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assests/breadcrum_arrow.png';

const Breadcrum = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className='breadcrum'>
      HOME 
      <img src={arrow_icon} alt='' /> 
      SHOP 
      <img src={arrow_icon} alt='' /> 
      {product.category?.name || product.category || 'Category'} 
      <img src={arrow_icon} alt='' /> 
      {product.title || product.name || 'Product'}
    </div>
  );
};

export default Breadcrum;
