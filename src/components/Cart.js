import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './cartStyle.scss';


const root = {
  position: "absolute",
  clear: "both",
  float: "right",
  flexGrow: 1,
  top: 0,
  right: 0
}

const img = {
  display: "flex",
  height: 80,
  width: 80,
  marginTop: 20,
  position: "relative",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 30,
  cursor: "pointer"
};

const floatCart = {
  marginTop: 20,
  display: "flex",
  flexWrap: "wrap",
}

const innerCart = {
  backgroundColor: "black",
  opacity: 0.5,
  width: 300,
  height: 700
}

const cartText = {
  color: "white"
}

const totalText = {
  color: "white",
  postion: "fixed",
  bottom: 0
}

function Cart(props) {
  const { classes, products, cartItems, removeCartItems, cartStatus, setCartStatus } = props;

  function handleCartClick() {
    setCartStatus(!cartStatus);
  }

  var total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  })

  // console.log("cartitems", cartItems);

  return (
    <div style={root}>
        {cartStatus ? (
          <div style={floatCart}>
            <div onClick={() => handleCartClick()} style={img}>X</div>
            <div style={innerCart} className="float-cart__content">
              <div className="float-cart__header">
                <p style={cartText}>{cartItems.length} Item(s) in Cart</p>
              </div>
              <div className="float-cart__shelf-container">
                {cartItems.map((item) => {
                  return  <div style={{color: "white", margin: 10}}>
                            <div>
                              <span>({item.size}) {item.name} (${item.price})</span>
                              <span style={{float: "right"}}>{item.quantity}</span>
                            </div>
                            <button onClick={() => removeCartItems(item)}>Remove</button>
                          </div>;
                })}
                {!cartItems.length && (
                  <p className="shelf-empty" style={cartText}>
                    Add some products in the bag <br />
                    :)
                  </p>
                )}
                <div style={totalText}>
                  Total: {total}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <img src={`/products/shoppingCart.jpg`} style={img} onClick={() => handleCartClick()}/>
        )}
    </div>
  );
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Cart;
