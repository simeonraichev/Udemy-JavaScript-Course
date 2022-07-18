//Exporting module
console.log('Exporting modele!');

const shoppingCart = 10;
const cart = [];
//Exports always work in top level code

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };