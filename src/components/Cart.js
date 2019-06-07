import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './cartStyle.scss';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const root = {
  position: "absolute",
  clear: "both",
  float: "right",
  flexGrow: 1,
  top: 0,
  right: 0
}

const img = {
  height: 80,
  width: 80,
  marginTop: 20,
  marginRight: 40
};

function Cart(props) {
  const { classes, products } = props;

  const [cartStatus, setCartStatus] = useState(false);

  function handleCartClick() {
    setCartStatus(!cartStatus);
  }

  return (
    <div style={root}>
        {cartStatus ? (
          <div onClick={() => handleCartClick()} style={img}>X</div>
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
