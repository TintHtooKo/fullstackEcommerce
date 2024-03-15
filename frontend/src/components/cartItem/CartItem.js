import React from "react";
import "./CartItem.css";
import removeIcon from "../../assets/cart_cross_icon.png";
import Demo from '../../assets/product.png'

export default function CartItem() {

  return (
    <div className="cartitem">
      <div className="cartitem-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      
            <div>
              <div className="cartitem-format cartitem-format-main">
                <img src={Demo} className="cartitem-product-icon" />
                <p>Product 1</p>
                <p>$ 20</p>
                <button className="cartitem-quantity">1</button>
                <p>$20</p>
                <img
                  className="cartitem-remove-icon"
                  src={removeIcon}
                />
              </div>
              <hr />
            </div>
          
      {/* <div className="cartitem-down">
        <div className="cartitem-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cartitem-total-item">
              <p>SubTotal</p>
              <p>$20</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Saving Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>$20</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-promo">
          <p>If You have a promo code, Enter it here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
