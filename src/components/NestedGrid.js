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

function FormRow(props) {
  const { classes, products } = props;
  const productRow = products.map(product => {
    console.log(product);
    return (
      <Grid key={product.title} item xs={3}>
        <Paper className={classes.paper}>
          <div>
            <p><b>{product.title}</b></p>
            <p>{product.style}</p>
            <p>{product.description}</p>
            <p>{product.currencyFormat}{product.price} {product.currencyId}</p>
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
  const productList = tuplize(products, 4);

  const productRows = productList.map(tuple => {
    return (
      <Grid key={tuple[0].sku} container item xs={12} spacing={40}>
        <FormRow classes={classes} products={tuple} />
      </Grid>
    )
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={32}>
        {productRows}
      </Grid>
    </div>
  );
}

NestedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);
