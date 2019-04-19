// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


import React from 'react';

const App = ({products}) => {
  const skus = Object.keys(products);
  const items = skus.map(sku => <li>{products[sku].title}</li>);
  return <ul>{items}</ul>;
};

export default App;
