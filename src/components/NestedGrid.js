import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Cart from './Cart.js';
import Size from './Size.js';

const styles = theme => ({
  root: {
    position: "relative",
    flexGrow: 1,
    margin: 20,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
    width: 225,
  },
});

const img = {
  height: 250,
  width: 200,
};

const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};


function FormRow(props) {
  const { classes, products, addToCart } = props;


  const productRow = products.map(product => {
    return (
      <Grid key={product.title} item xs="auto">
        <Paper className={classes.paper}>
          <div>
            <img style={img} src={`/products/${product.sku}_1.jpg`} alt={product.title} title={product.title} />
            <p><b>{product.title}</b></p>
            <p>{product.description}</p>
            <div className="val">
              {product.currencyFormat}
              <b>{product.price}</b>
            </div>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </Paper>
      </Grid>
    )
  })
  return (
    <React.Fragment>
      {productRow}
    </React.Fragment>
  );
}

FormRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

function tuplize(allproducts, n) {
  var productList = [];
  var triple = [];
  allproducts.forEach(product => {
    if(triple.length === n) {
      productList.push(triple);
      triple = [];
    } else {
      triple.push(product);
    }
  })
  productList.push(triple);
  return productList;
}

function NestedGrid(props) {
  const { classes, products } = props;

  const [cartItems, setCartItems] = useState([]);

  function handleAddCartItem(item) {
    setCartItems(cartItems.concat(item))
    console.log(cartItems);
  }

  function handleRemoveCartItem(id) {
    const index = cartItems.findIndex(obj => obj.sku = id);
    const newCart = [
      ...cartItems.slice(0, index),
      ...cartItems.slice(index+1)
    ]
    setCartItems(newCart)
  }

  // Make this cleaner later yeet
  const productList = tuplize(products, 4);

  const productRows = productList.map(tuple => {
    return (
      <Grid key={tuple[0].sku} container item spacing={16}>
        <FormRow classes={classes} products={tuple} addToCart={handleAddCartItem}/>
      </Grid>
    )
  });


  return (
    <div className="App">
      <Grid container className={classes.root}>
        <Grid item xs={2}>
          <Size />
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={8}>
            {productRows}
          </Grid>
        </Grid>
      </Grid>
      <Cart cartItems={cartItems} removeCartItems={handleRemoveCartItem}/>
    </div>
  );
}

NestedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);
