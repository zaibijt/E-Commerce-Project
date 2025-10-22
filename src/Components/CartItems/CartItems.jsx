import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assests/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    increaseQuantity,
    decreaseQuantity,
    getCartProducts,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  // Combine local + API products from context
  const allCartProducts = getCartProducts();

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {allCartProducts.map((e) => {
        const sizeKey = e.selectedSize || "default";
        const uniqueKey = `${e.id}-${sizeKey}`;
        const quantity = cartItems[uniqueKey] || 0;

        if (quantity > 0) {
          return (
            <div key={uniqueKey}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={e.image}
                  alt={e.name || 'product image'}
                  className='carticon-product-icon'
                />
                <p>{e.name}</p>
                <p>${e.new_price}</p>

                {/* ✅ SHOW SELECTED SIZE */}
                <p>{e.selectedSize || "—"}</p>

                <div className="cartitems-quantity-control">
                  <button onClick={() => decreaseQuantity(e.id, e.selectedSize)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(e.id, e.selectedSize)}>+</button>
                </div>

                <p>${(e.new_price * quantity).toFixed(2)}</p>
                <img
                  className='cartitems_remove-icon'
                  src={remove_icon}
                  alt="Remove"
                  onClick={() => removeFromCart(e.id, e.selectedSize)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo-code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
