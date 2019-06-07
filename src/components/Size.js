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

function Size(props) {
  const { classes, products } = props;

  return (
    <Grid container className="sizes" justify="center">
      <Grid container spacing={24}>
        <h2>Sizes:</h2>
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
  );
}

Size.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Size);
