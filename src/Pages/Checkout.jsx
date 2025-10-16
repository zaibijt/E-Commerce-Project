import React from "react";
import "./css/Checkout.css";

const Checkout = () => {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form className="checkout-form">
        <h3>Shipping Information</h3>

        <div className="delivery-options">
          <label className="option">
            <input type="radio" name="shipping" defaultChecked /> Delivery
          </label>
          <label className="option">
            <input type="radio" name="shipping" /> Pick up
          </label>
        </div>

        <div className="form-group">
          <label>Full name *</label>
          <input type="text" placeholder="Enter full name" required />
        </div>

        <div className="form-group">
          <label>Email address *</label>
          <input type="email" placeholder="Enter email address" required />
        </div>

        <div className="form-group">
          <label>Phone number *</label>
          <input type="tel" placeholder="Enter phone number" required />
        </div>

        <div className="form-group">
          <label>Country *</label>
          <select required>
            <option value="">Choose country</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input type="text" placeholder="Enter city" />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" placeholder="Enter state" />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input type="text" placeholder="Enter ZIP code" />
          </div>
        </div>

        <div className="form-terms">
          <input type="checkbox" required />
          <span>I have read and agree to the Terms and Conditions.</span>
        </div>

        <button type="submit" className="checkout-btn">Continue to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
