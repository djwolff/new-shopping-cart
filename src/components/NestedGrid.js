import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};


function FormRow(props) {
  const { classes, products } = props;


  const productRow = products.map(product => {
    console.log(product);
    return (
      <Grid key={product.title} item xs="auto">
        <Paper className={classes.paper}>
          <div>
            <div className="shelf-item">
              <img src={`/products/${product.sku}_1.jpg`} alt={product.title} title={product.title} />
            </div>
            <p><b>{product.title}</b></p>
            <p>{product.description}</p>
            <div className="val">
              {product.currencyFormat}
              <b>{product.price}</b>
            </div>
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

  // Make this cleaner later yeet
  const productList = tuplize(products, 3);

  const productRows = productList.map(tuple => {
    return (
      <Grid key={tuple[0].sku} container item spacing={16}>
        <FormRow classes={classes} products={tuple} />
      </Grid>
    )
  });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Grid container className="sizes" justify="center">
        <Grid container spacing={24}>
          <h1>Sizes:</h1>
        </Grid>
        <Grid container spacing={24}>
          {["S", "M", "L", "XL"].map(size => (
            <Grid key={size} item>
              <Paper className={classes.paper} style={{height: "25%", "padding-top": 0}}>
              <h4>{size}</h4>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={16}>
          {productRows}
        </Grid>
      </Grid>
    </Grid>
  );
}

NestedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);
