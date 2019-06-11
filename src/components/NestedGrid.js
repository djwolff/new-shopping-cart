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
    height: 360,
    width: 220,
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
            {/*}<p>{product.description}</p>*/}
            <div className="val">
              {product.currencyFormat}
              <b>{product.price}</b>
            </div>
            <button style={{margin: 2}} onClick={() => addToCart(product, "S")}>
              (S)
            </button>
            <button style={{margin: 2}} onClick={() => addToCart(product, "M")}>
              (M)
            </button>
            <button style={{margin: 2}} onClick={() => addToCart(product, "L")}>
              (L)
            </button>
            <button style={{margin: 2}} onClick={() => addToCart(product, "XL")}>
              (XL)
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
  const [cartStatus, setCartStatus] = useState(false);

  function handleAddCartItem(newItem, size) {
    console.log("ADDING ITEM");
    var index = cartItems.findIndex(x => (x.sku === newItem.sku && x.size === size));

    var newCart = JSON.parse(JSON.stringify(cartItems));
    if(index >= 0) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({sku: newItem.sku, name: newItem.title, price: newItem.price, quantity: 1, size: size});
    }

    setCartStatus(true);
    setCartItems(newCart);
  }

  function handleRemoveCartItem(item) {
    console.log("deleting one ", item.name, " size: ", item.size);
    const index = cartItems.findIndex(x => (x.sku === item.sku && x.size === item.size));
    if(index >= 0){

      var newCart = JSON.parse(JSON.stringify(cartItems));
      if(newCart[index].quantity === 1) {
        newCart = [
          ...cartItems.slice(0, index),
          ...cartItems.slice(index+1)
        ]
      } else {
        newCart[index].quantity -= 1;
      }
      setCartItems(newCart);
    } else {
      console.log("CANT REMOVE ITEM");
    }
  }

  // Make this cleaner later yeet
  const productList = tuplize(products, 4);

  const productRows = productList.map(tuple => {
    return (
      <Grid key={tuple[0].sku} container item spacing={16}>
        <FormRow classes={classes} products={tuple} addToCart={handleAddCartItem} />
      </Grid>
    )
  });


  return (
    <div className="App">
      <Grid container className={classes.root}>
        {/*<Grid item xs={2}>
          <Size editSize={editSize} clothSize={size}/>
        </Grid>*/}
        <Grid item xs={10}>
          <Grid container spacing={8}>
            {productRows}
          </Grid>
        </Grid>
      </Grid>
      <Cart cartItems={cartItems} removeCartItems={handleRemoveCartItem} cartStatus={cartStatus} setCartStatus={setCartStatus}/>
    </div>
  );
}

NestedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);
