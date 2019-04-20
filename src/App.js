// import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import React from 'react';
import NestedGrid from './components/NestedGrid';

const App = ({products}) => {
  const skus = Object.keys(products);
  const items = skus.map(sku => products[sku]);
  return <NestedGrid products={items} />;
};

export default App;
