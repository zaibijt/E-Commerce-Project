import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <Link
        to={`/product/${props.id}`}
        state={{ product: props, from: props.fromApi ? "api" : "local" }} // ✅ added
        onClick={() => window.scrollTo(0, 0)} // ✅ fixed scroll call
      >
        <img src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
