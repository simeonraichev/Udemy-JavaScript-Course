//Importing module 
// import { addToCart} from './shoppingCart';
console.log('Importing module!')

// addToCart(bread, 5);
import * as ShoppingCart from './shoppingCart';
ShoppingCart.addToCart(bread, 5);